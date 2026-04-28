import axios from 'axios';

// Base API URL from environment or default
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  AUTH_LOGIN: `${API_BASE_URL}/api/auth/login`,
  AUTH_VERIFY: `${API_BASE_URL}/api/auth/verify`,

  // Users
  USERS_SEARCH: `${API_BASE_URL}/api/users/search`,
  USERS_PROFILE: (userId) => `${API_BASE_URL}/api/users/profile/${userId}`,

  // Media
  MEDIA_LIST: `${API_BASE_URL}/api/media`,
  MEDIA_USER: (userId) => `${API_BASE_URL}/api/media/user/${userId}`,
  MEDIA_FILE: (filePath) => `${API_BASE_URL}${filePath}`,

  // Match
  MATCH_SEND: `${API_BASE_URL}/api/match/send`,

  // Payment
  PAYMENT_PROCESS: `${API_BASE_URL}/api/payment`,
};

// Helper function to get full media URL
export const getMediaUrl = (filePath) => {
  if (!filePath) return 'https://via.placeholder.com/300';
  return API_ENDPOINTS.MEDIA_FILE(filePath);
};

export default API_ENDPOINTS;
