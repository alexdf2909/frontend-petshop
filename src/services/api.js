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