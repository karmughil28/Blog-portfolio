import { getFirebaseAdmin } from '../config/firebaseAdmin.js';

// Verifies the Firebase ID token. Never trust a UID sent in the request body.
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Sign in to continue.' });

    const admin = getFirebaseAdmin();
    req.user = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Your session is invalid or expired. Please sign in again.' });
  }
}

// Admin access is checked on the server for every protected write request.
export function requireAdmin(req, res, next) {
  const allowedUids = (process.env.ADMIN_UIDS || '').split(',').map(value => value.trim()).filter(Boolean);
  if (!req.user || !allowedUids.includes(req.user.uid)) {
    return res.status(403).json({ message: 'Admin access is required for this action.' });
  }
  next();
}
