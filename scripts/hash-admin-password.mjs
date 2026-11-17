// Usage: npm run admin:hash -- "your new password"
// Prints a value for ADMIN_PASSWORD_HASH (src/admin/credentials.js) or VITE_ADMIN_PASSWORD_HASH (.env).
import { webcrypto as crypto } from 'node:crypto';
const ITER = 210000;
const pw = process.argv[2];
if (!pw || pw.length < 12) { console.error('Give a password of at least 12 characters: npm run admin:hash -- "your password"'); process.exit(1); }
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
const bits = new Uint8Array(await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITER }, key, 256));
const hex = (u) => [...u].map((b) => b.toString(16).padStart(2, '0')).join('');
console.log(`pbkdf2$${ITER}$${hex(salt)}$${hex(bits)}`);
