import { ADMIN_EMAIL, ADMIN_PASSWORD_HASH } from './credentials';

const SESSION_KEY = 'sc_admin_session', LOCK_KEY = 'sc_admin_lock';
const SESSION_MS = 60 * 60 * 1000, MAX_FAILS = 5;
const enc = new TextEncoder();
const unhex = (h) => Uint8Array.from(h.match(/../g) || [], (x) => parseInt(x, 16));
const same = (a, b) => { let d = a.length ^ b.length; for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a[i] || 0) ^ (b[i] || 0); return d === 0; };

async function derive(password, saltHex, iterations) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  return new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: unhex(saltHex), iterations }, key, 256));
}
const read = (store, k) => { try { return JSON.parse(store.getItem(k) || 'null'); } catch { return null; } };
const write = (store, k, v) => { try { store.setItem(k, JSON.stringify(v)); } catch { /* storage blocked */ } };

// Returns seconds left if too many failed attempts, else 0.
export function lockedFor() {
  const l = read(localStorage, LOCK_KEY); if (!l?.until) return 0;
  return Math.max(0, Math.ceil((l.until - Date.now()) / 1000));
}
function registerFailure() {
  const l = read(localStorage, LOCK_KEY) || { fails: 0 }; const fails = (l.fails || 0) + 1;
  const until = fails >= MAX_FAILS ? Date.now() + Math.min(15 * 60, 30 * 2 ** (fails - MAX_FAILS)) * 1000 : 0;
  write(localStorage, LOCK_KEY, { fails, until });
}

// Resolves { ok: true } or { ok: false, error }.
export async function login(email, password) {
  const wait = lockedFor();
  if (wait) return { ok: false, error: `Too many failed attempts. Try again in ${wait > 60 ? Math.ceil(wait / 60) + ' minutes' : wait + ' seconds'}.` };
  if (!globalThis.crypto?.subtle) return { ok: false, error: 'Secure login needs https or localhost. Open the site over https.' };
  const [, iter, salt, hash] = ADMIN_PASSWORD_HASH.split('$');
  if (!iter || !salt || !hash) return { ok: false, error: 'Admin login is not configured. Set a password hash (see README).' };
  const got = await derive(String(password || ''), salt, Number(iter)); // always run, so timing does not reveal a wrong email
  const emailOk = same(enc.encode(String(email || '').trim().toLowerCase()), enc.encode(ADMIN_EMAIL));
  if (emailOk && same(got, unhex(hash))) {
    localStorage.removeItem(LOCK_KEY); write(sessionStorage, SESSION_KEY, { exp: Date.now() + SESSION_MS });
    return { ok: true };
  }
  registerFailure();
  return { ok: false, error: lockedFor() ? 'Too many failed attempts. Login is locked for a while.' : 'Email or password is incorrect.' };
}
export function isAdmin() {
  const s = read(sessionStorage, SESSION_KEY);
  if (!s || typeof s.exp !== 'number' || s.exp < Date.now()) { sessionStorage.removeItem(SESSION_KEY); return false; }
  return true;
}
export const touchSession = () => { if (isAdmin()) write(sessionStorage, SESSION_KEY, { exp: Date.now() + SESSION_MS }); };
export const logout = () => sessionStorage.removeItem(SESSION_KEY);
