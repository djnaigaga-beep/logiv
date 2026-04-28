import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils/constants';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    searchProfiles();
  }, [token, filter]);

  const searchProfiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.USERS_SEARCH, {
        headers: { Authorization: `Bearer ${token}` }
      });
      let filteredProfiles = response.data;
      
      if (searchTerm) {
        filteredProfiles = filteredProfiles.filter(p =>
          p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.lastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      setProfiles(filteredProfiles);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchProfiles();
  };

  if (loading) {
    return <div className="loading">Loading profiles...</div>;
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>💕 Find Your Love</h1>
        <p>Browse and connect with amazing people</p>
      </div>

      <div className="search-container">
        <div className="search-box">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>

        {profiles.length > 0 ? (
          <div className="profiles-grid">
            {profiles.map(profile => (
              <div key={profile._id} className="profile-card">
                <div className="profile-image-container">
                  <img
                    src={profile.profilePhoto || 'https://via.placeholder.com/250'}
                    alt={`${profile.firstName} ${profile.lastName}`}
                    className="profile-image"
                  />
                  <div className="profile-badge">{profile.age} yrs</div>
                </div>
                
                <div className="profile-info">
                  <h3 className="profile-name">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="location">📍 {profile.country}</p>
                  <p className="bio">{profile.bio || 'No bio yet'}</p>
                  
                  <div className="profile-actions">
                    <button
                      className="view-btn"
                      onClick={() => handleViewProfile(profile._id)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-profiles">
            <p>😔 No profiles found</p>
            {searchTerm && <p>Try adjusting your search</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
