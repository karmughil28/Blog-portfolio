import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try { await signInWithEmailAndPassword(auth, email, password); navigate('/admin'); }
    catch (err) { setError(err.code?.replace('auth/', '').replaceAll('-', ' ') || 'Unable to sign in.'); }
    finally { setBusy(false); }
  }

  return <main className="auth-layout"><form className="auth-card" onSubmit={handleSubmit}><div className="eyebrow">WELCOME BACK</div><h1>Sign in.</h1><p>Access your publishing studio.</p>
    {error && <div className="notice error">{error}</div>}
    <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    <button className="button button-dark full" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    <small>Need an account? <Link to="/signup">Create one</Link></small>
  </form></main>;
}
