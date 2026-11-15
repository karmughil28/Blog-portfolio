import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Signup() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false); const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault(); setError(''); setBusy(true);
    try { await createUserWithEmailAndPassword(auth, email, password); navigate('/admin'); }
    catch (err) { setError(err.code?.replace('auth/', '').replaceAll('-', ' ') || 'Unable to create account.'); }
    finally { setBusy(false); }
  }
  return <main className="auth-layout"><form className="auth-card" onSubmit={handleSubmit}><div className="eyebrow">JOIN THE STUDIO</div><h1>Create account.</h1><p>Sign up to access your account. Admin publishing access must be granted separately.</p>
    {error && <div className="notice error">{error}</div>}
    <label>Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
    <label>Password<input type="password" minLength="6" value={password} onChange={e => setPassword(e.target.value)} required /></label>
    <button className="button button-dark full" disabled={busy}>{busy ? 'Creating…' : 'Create account'}</button>
    <small>Already registered? <Link to="/login">Sign in</Link></small>
  </form></main>;
}
