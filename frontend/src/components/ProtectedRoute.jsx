import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This is a user-experience guard only. The backend enforces actual admin access.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-loader">Checking your session…</div>;
  return user ? children : <Navigate to="/login" replace />;
}
