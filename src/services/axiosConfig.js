// src/services/axiosConfig.js
import axios from 'axios';
import { refreshAccessToken } from './auth';
import { jwtDecode } from 'jwt-decode';

const instance = axios.create();

instance.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('accessToken');

  if (token) {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      try {
        token = await refreshAccessToken();
      } catch (err) {
        console.error('No se pudo renovar el token', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        throw err;
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
