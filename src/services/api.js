import axios from 'axios';

const API_URL = 'http://localhost:8080';
// 📁 src/services/api.js
export const fetchProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/producto`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo productos');
  }
};

export const fetchProductoById = async (productoId) => {
  try {
    const response = await axios.get(`${API_URL}/producto/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo producto');
  }
};

export const fetchCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categoria`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo categorías');
  }
};

export const fetchEspecies = async () => {
  try {
    const response = await axios.get(`${API_URL}/especie`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo especies');
  }
};

export const fetchMarcas = async () => {
  try {
    const response = await axios.get(`${API_URL}/marca`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo marcas');
  }
};

export const fetchEtiquetas = async () => {
  try {
    const response = await axios.get(`${API_URL}/etiqueta`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo etiquetas');
  }
};

export const fetchVariantesByProducto = async (productoId) => {
  try {
    const response = await axios.get(`${API_URL}/variante/producto/${productoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo variantes');
  }
};

export const fetchLotesByVariante = async (varianteId) => {
  try {
    const response = await axios.get(`${API_URL}/lote/variante/${varianteId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo lotes');
  }
};