// Static admin credentials. The password itself is NOT stored here, only a salted PBKDF2 hash of it.
// Change them with:  npm run admin:hash -- "new password"   then paste the output below,
// or set VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD_HASH in .env (see .env.example).
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'admin@softcompare.com').trim().toLowerCase();
export const ADMIN_PASSWORD_HASH = import.meta.env.VITE_ADMIN_PASSWORD_HASH || 'pbkdf2$210000$269c978040932031fce71724aa80f5ad$25ca0d70cc604bf79c1add078413f769b1137600e1c554c7c4c8b895fd67d217';
