// src/services/api.js
import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3001', // Using a public test API
  timeout: 10000, // 10-second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add request interceptor for authentication or logging
api.interceptors.request.use(
  (config) => {
    // Add auth token if needed
    // const token = 'your-token';
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log('Request:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;