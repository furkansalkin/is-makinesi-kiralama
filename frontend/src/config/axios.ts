import axios from 'axios';

// API URL'ini .env dosyasından al
const API_URL = import.meta.env.VITE_API_URL || 'https://is-makinesi-kiralama-1.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hata durumunda konsola yazdır
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 