import React from 'react';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Nav() {
  const { currentUser, handleUserLogout } = useAuth();
  return (
    <nav className="nav-bar">
      <span className="logo">
        <h3 className="bookkers">
          <Link className="link" to="/">📚Bookkers</Link>
        </h3>
      </span>
      <span className="options">
        {currentUser ? (
          <div>
            <Link className="link" to="/newbook"><p>Crear libro</p></Link>
            <Link className="link" to="/users"><p>Comunidad</p></Link>
            <Link className="link" to="/users/me"><p>Mi perfil</p></Link>
            {/* <p>Mis reviews</p> */}
            <button type="button" className="buttonLogout" onClick={handleUserLogout}><p>Logout</p></button>
          </div>
        ) : (
          <>
            <Link className="link" to="/login"><p>Log in</p></Link>
            <Link className="link" to="/signup"><p>Sign up</p></Link>
          </>
        )}
      </span>
    </nav>
  );
}

export default Nav;
