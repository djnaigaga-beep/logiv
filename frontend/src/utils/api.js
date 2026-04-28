import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const apiCall = async (endpoint, method = 'GET', data = null, token = null) => {
  const config = {
    method,
    url: `${API_URL}/api${endpoint}`
  };

  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`
    };
  }

  if (data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default apiCall;
