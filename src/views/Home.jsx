import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Books from '../components/Books';

export default function Home() {
  const { currentUser, handleUserLogout } = useAuth();

  return (
    <div>
      <h2>
        Welcome to Gud Reads
        {' '}
        {currentUser?.firstName}
      </h2>
      <Link to="/users">Users</Link>
      <div>
        {currentUser ? (
          <button type="button" onClick={handleUserLogout}>Logout</button>
        ) : (
          <>
            <h3>Have an account? Log In</h3>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      <Books />
    </div>
  );
}
