import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-brand">
          Home
        </a>
        <a href="/verify/consultation" className="navbar-link">
          Verify
        </a>
      </div>
      <div className="navbar-right">
        <a href="http://localhost:3001/signup" className="navbar-link">
          Signup
        </a>
        <a href="http://localhost:3001/auth/login/" className="navbar-link">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
