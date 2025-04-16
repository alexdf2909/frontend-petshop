// 📁 src/hooks/useTokenHeader.js
import axios from 'axios';

const getTokenHeader = () => {
  const token = localStorage.getItem('token');
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

// Instancia de axios pública (sin token)
const axiosPublic = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instancia de axios privada (con token)
const axiosPrivate = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    ...getTokenHeader(),
    'Content-Type': 'application/json',
  },
});

// Exporta tanto axiosPrivate como axiosPublic
export { axiosPublic, axiosPrivate, getTokenHeader };