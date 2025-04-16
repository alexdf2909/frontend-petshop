import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);

    const token = response.data.token;  // Accede a 'token' del objeto

    localStorage.setItem('token', token);

    return token;

  } catch (err) {
    // Si ocurre un error, podemos manejarlo aquí
    throw new Error(err.response?.data?.message || 'Error al iniciar sesión');
  }
};


export const verifyUser = async (verificationData) => {
    const response = await axios.post(`${API_URL}/verificar`, verificationData);
    return response.data;
  };