import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_ENDPOINTS, getMediaUrl } from '../utils/constants';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const { userId } = useParams();
  const { token, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [exemptionCode, setExemptionCode] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchProfile();
      fetchUserMedia();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.USERS_PROFILE(userId));
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const fetchUserMedia = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.MEDIA_USER(userId));
      setMedia(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch media:', error);
      setLoading(false);
    }
  };

  const handleSendMatchRequest = async () => {
    try {
      const response = await axios.post(
        API_ENDPOINTS.MATCH_SEND,
        { toUserId: userId, exemptionCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.requiresPayment) {
        setShowPayment(true);
      } else {
        alert('Match request sent!');
        setShowPayment(false);
        setExemptionCode('');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send request');
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <button className="back-btn" onClick={() => navigate('/search')}>
        ← Back to Search
      </button>

      {profile && (
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-photo">
              <img
                src={profile.profilePhoto || 'https://via.placeholder.com/400'}
                alt={`${profile.firstName} ${profile.lastName}`}
              />
              <div className="age-badge">{profile.age}</div>
            </div>

            <div className="profile-details">
              <h1>{profile.firstName} {profile.lastName}</h1>
              <p className="location">📍 {profile.country}</p>
              <p className="bio-text">{profile.bio}</p>

              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-label">Age</span>
                  <span className="stat-value">{profile.age}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Gender</span>
                  <span className="stat-value">{profile.gender === 'male' ? 'Male' : 'Female'}</span>
                </div>
              </div>

              {user?.gender === 'male' && user?._id !== userId && (
                <button
                  className="match-btn"
                  onClick={() => setShowPayment(true)}
                >
                  💝 Send Love Request
                </button>
              )}
            </div>
          </div>

          {media.length > 0 && (
            <div className="profile-media">
              <h2>Photos & Videos</h2>
              <div className="media-grid">
                {media.map(item => (
                  <div
                    key={item._id}
                    className="media-item"
                    onClick={() => setSelectedMedia(item)}
                  >
                    {item.mediaType === 'image' ? (
                      <img src={getMediaUrl(item.filePath)} alt="Media" />
                    ) : (
                      <video>
                        <source src={getMediaUrl(item.filePath)} />
                      </video>
                    )}
                    <div className="media-play-icon">
                      {item.mediaType === 'video' && '▶'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="modal-overlay" onClick={() => setShowPayment(false)}>
          <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Send Love Request</h2>
            <div className="payment-info">
              <p className="cost">💰 Cost: <strong>€50</strong></p>
              <p className="description">
                Send a love request to {profile?.firstName}
              </p>
              <input
                type="text"
                placeholder="Enter exemption code (optional)"
                value={exemptionCode}
                onChange={(e) => setExemptionCode(e.target.value)}
                className="exemption-input"
              />
            </div>
            <div className="payment-actions">
              <button
                className="proceed-btn"
                onClick={handleSendMatchRequest}
              >
                Proceed to Payment
              </button>
              <button
                className="cancel-btn"
                onClick={() => {
                  setShowPayment(false);
                  setExemptionCode('');
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Lightbox */}
      {selectedMedia && (
        <div className="media-modal-overlay" onClick={() => setSelectedMedia(null)}>
          <div className="media-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedMedia(null)}
            >
              ✕
            </button>
            <div className="modal-content">
              {selectedMedia.mediaType === 'image' ? (
                <img
                  src={getMediaUrl(selectedMedia.filePath)}
                  alt="Media"
                />
              ) : (
                <video controls autoPlay>
                  <source src={getMediaUrl(selectedMedia.filePath)} />
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
