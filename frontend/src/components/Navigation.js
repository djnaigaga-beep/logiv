import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navigation.css';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <h1>💜 Ugazo</h1>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Find Love</Link>
          <Link to="/media" className="nav-link">Media</Link>
          <Link to={`/profile/${user?._id}`} className="nav-link">My Profile</Link>
          
          <div className="nav-user">
            <span className="user-name">{user?.firstName}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="nav-mobile-menu">
          <button className="menu-toggle">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
