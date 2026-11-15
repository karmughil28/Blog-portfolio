import { auth } from '../config/firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Attach a fresh Firebase ID token only when a signed-in user makes a request.
export async function apiRequest(path, options = {}) {
  const token = await auth.currentUser?.getIdToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) throw new Error(payload.message || 'Something went wrong.');
  return payload;
}
