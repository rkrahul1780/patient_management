import React from 'react';
import './Navbar.css';
import { LogOut } from '../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const Role = localStorage.getItem('Role');
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('Role', Role);

  const handleLogout = () => {
    dispatch(LogOut(navigate));
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {token ? (
          <a className="navbar-brand">
            <span className="logo">RK</span>care
          </a>
        ) : (
          <a href="http://localhost:3000" className="navbar-brand">
            <span className="logo">RK</span>care
          </a>
        )}
      </div>
      <div className="navbar-right">
        {Role === 'Patient' && (
          <>
            <a href="/dashboard" className="navbar-link">
              Dashboard
            </a>
            <a href="/profile" className="navbar-link">
              Profile
            </a>
            <a href="/consultation" className="navbar-link">
              Consultation
            </a>
            <a href="/vaccination" className="navbar-link">
              Vaccination
            </a>
            <a href="/changepassword" className="navbar-link">
              Change Password
            </a>
            <a href="#" className="navbar-link" onClick={handleLogout}>
              Logout
            </a>
          </>
        )}

        {Role === 'Admin' && (
          <>
            <a href="/dashboard" className="navbar-link">
              Dashboard
            </a>
            <a href="/consultation" className="navbar-link">
              Consultation
            </a>
            <a href="/vaccination" className="navbar-link">
              Vaccination
            </a>
            <a href="/transaction" className="navbar-link">
              Transaction
            </a>
            <a href="/message" className="navbar-link">
              Messages
            </a>
            <a href="/changepassword" className="navbar-link">
              Change Password
            </a>
            <a href="#" className="navbar-link" onClick={handleLogout}>
              Logout
            </a>
          </>
        )}

        {!Role && (
          <>
            <a href="/signup" className="navbar-link">
              Signup
            </a>
            <a href="/auth/login" className="navbar-link">
              Login
            </a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
