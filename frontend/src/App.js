import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Pages
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import MediaPage from './pages/MediaPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Navigation from './components/Navigation';

import './styles/App.css';

const ProtectedLayout = ({ children }) => (
  <div className="protected-layout">
    <Navigation />
    <main className="main-content">
      {children}
    </main>
  </div>
);

const App = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<ProtectedLayout><Dashboard /></ProtectedLayout>} />
            <Route path="/media" element={<ProtectedLayout><MediaPage /></ProtectedLayout>} />
            <Route path="/search" element={<ProtectedLayout><SearchPage /></ProtectedLayout>} />
            <Route path="/profile/:userId" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
