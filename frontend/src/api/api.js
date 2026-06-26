import axios from 'axios';

// All API calls go through this instance
const api = axios.create({ baseURL: "https://qmedia-ctst.onrender.com" });

// Auto-attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('qmedia_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
