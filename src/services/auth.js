//src/services/auth.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    console.log("Login response:", response.data);

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return { accessToken, refreshToken };

  } catch (err) {
    throw new Error(err.response?.data?.message || 'Error al iniciar sesión');
  }
};


export const verifyUser = async (verificationData) => {
    const response = await axios.post(`${API_URL}/verificar`, verificationData);
    return response.data;
  };

  export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No hay refresh token');
  
    const response = await axios.post(`${API_URL}/refresh`, { refreshToken });
    const { accessToken } = response.data;
  
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  };