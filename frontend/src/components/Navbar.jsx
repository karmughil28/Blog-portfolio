import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="navbar">
      <Link className="brand" to="/">fieldnotes<span>.</span></Link>
      <nav>
        <NavLink to="/blogs">Journal</NavLink>
        <a href="/#about">About</a>
        {user ? <><NavLink to="/admin">Studio</NavLink><button className="nav-button" onClick={logout}>Log out</button></>
          : <NavLink to="/login">Sign in</NavLink>}
      </nav>
    </header>
  );
}
