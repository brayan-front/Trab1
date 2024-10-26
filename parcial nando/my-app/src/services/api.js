import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'  // Asegúrate que este puerto coincida con tu backend
});

// Interceptor para añadir el token a todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export const authService = {
  login: (username, password) => 
    api.post('/auth/login', { username, password }),
  register: (userData) => 
    api.post('/auth/register', userData)
};

export const codeService = {
  createCode: (code) => 
    api.post('/codes', { code }),
  getCodes: () => 
    api.get('/codes'),
  redeemCode: (codeId) => 
    api.post(`/codes/${codeId}/redeem`)
};
