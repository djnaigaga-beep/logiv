import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, getMediaUrl } from '../utils/constants';
import '../styles/MediaPage.css';

const MediaPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    fetchMedia();
  }, [token]);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ENDPOINTS.MEDIA_LIST, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMediaList(response.data);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
  };

  if (loading) {
    return <div className="loading">Loading media...</div>;
  }

  return (
    <div className="media-page">
      <div className="media-header">
        <h1>📸 Media Gallery</h1>
        <p>Browse photos and videos from our community members</p>
      </div>

      <div className="media-container">
        {mediaList.length > 0 ? (
          <div className="media-grid">
            {mediaList.map(media => (
              <div
                key={media._id}
                className="media-item"
                onClick={() => handleMediaClick(media)}
              >
                {media.mediaType === 'image' ? (
                  <img
                    src={getMediaUrl(media.filePath)}
                    alt="Media"
                    className="media-thumbnail"
                  />
                ) : (
                  <video className="media-thumbnail">
                    <source src={getMediaUrl(media.filePath)} />
                  </video>
                )}
                <div className="media-overlay">
                  <div className="media-info-overlay">
                    <span className="media-user">
                      {media.userId?.firstName} {media.userId?.lastName}
                    </span>
                    <span className="media-likes">❤️ {media.likes?.length || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-media">
            <p>📭 No media available yet</p>
            <small>Come back later to see photos and videos</small>
          </div>
        )}
      </div>

      {selectedMedia && (
        <div className="media-modal-overlay" onClick={handleCloseModal}>
          <div className="media-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>✕</button>
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
              <div className="modal-info">
                <h3>{selectedMedia.userId?.firstName} {selectedMedia.userId?.lastName}</h3>
                <p>❤️ {selectedMedia.likes?.length || 0} people liked this</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaPage;
