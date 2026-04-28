import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleNavigate = (path) => {
    if (!acceptedTerms && path !== '/') {
      alert('Please accept Terms and Conditions first');
      setShowTerms(true);
      return;
    }
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {user?.firstName}! 👋</h2>
          <p>You're logged in as: <strong>{user?.email}</strong></p>
          <p>Country: <strong>{user?.country}</strong></p>
          <p>Gender: <strong>{user?.gender === 'male' ? 'Male' : 'Female'}</strong></p>
        </div>

        <div className="action-cards">
          <div className="card media-card" onClick={() => handleNavigate('/media')}>
            <div className="card-icon">📸</div>
            <h3>View Media</h3>
            <p>Check out photos and videos from other members</p>
          </div>
          <div className="card search-card" onClick={() => handleNavigate('/search')}>
            <div className="card-icon">💕</div>
            <h3>Find Love</h3>
            <p>Browse profiles and send love requests</p>
          </div>
          <div className="card profile-card" onClick={() => handleNavigate(`/profile/${user?._id}`)}>
            <div className="card-icon">👤</div>
            <h3>My Profile</h3>
            <p>View and edit your profile</p>
          </div>
          <div className="card terms-card" onClick={() => setShowTerms(true)}>
            <div className="card-icon">📋</div>
            <h3>Terms & Rules</h3>
            <p>Read our terms and conditions</p>
          </div>
        </div>
      </div>

      {showTerms && (
        <div className="modal-overlay">
          <div className="terms-modal">
            <h2>Terms and Conditions</h2>
            <div className="terms-content">
              <h3>1. Eligibility</h3>
              <p>Users must be at least 18 years old. Only females from Uganda and males from European countries are allowed to register.</p>

              <h3>2. Account Responsibility</h3>
              <p>You are responsible for maintaining the confidentiality of your account information and password.</p>

              <h3>3. User Conduct</h3>
              <p>Users must not post inappropriate, offensive, or illegal content. Harassment and abuse will result in account termination.</p>

              <h3>4. Match Requests and Payments</h3>
              <p>Male users from Europe must pay €50 to send a match request to Ugandan females. Exemption code: 23234</p>

              <h3>5. Privacy</h3>
              <p>We protect your personal information and email addresses are never shared in profiles.</p>

              <h3>6. Limitation of Liability</h3>
              <p>Ugazo is provided as-is without warranties. We are not liable for any damages resulting from your use of the platform.</p>

              <h3>7. Termination</h3>
              <p>We reserve the right to terminate accounts violating these terms.</p>

              <h3>8. Amendments</h3>
              <p>We may update these terms at any time. Continued use constitutes acceptance.</p>
            </div>
            <div className="terms-actions">
              <label>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                I accept the Terms and Conditions
              </label>
              <button
                onClick={() => setShowTerms(false)}
                disabled={!acceptedTerms}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
