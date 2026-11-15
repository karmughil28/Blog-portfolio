import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import { useAuth } from './context/AuthContext';

function Footer() {
  return <footer className="footer"><span>fieldnotes<span className="accent">.</span></span><span>Made with curiosity · © {new Date().getFullYear()}</span></footer>;
}

export default function App() {
  const { loading } = useAuth();
  if (loading) return <div className="page-loader">Preparing your space…</div>;
  return <><Navbar /><Routes>
    <Route path="/" element={<Home />} /><Route path="/blogs" element={<Blogs />} /><Route path="/blogs/:id" element={<BlogDetails />} />
    <Route path="/login" element={<Login />} /><Route path="/signup" element={<Signup />} />
    <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes><Footer /></>;
}
