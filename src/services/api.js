// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';


/* ********CATEGORIAS********** */
export const fetchCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categoria`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo categorías');
  }
};

export const fetchCategoriaById = async (categoriaId) => {
  try {
    const response = await axios.get(`${API_URL}/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo categoría');
  }
};

/* ********MARCAS********** */
export const fetchMarcas = async () => {
  try {
    const response = await axios.get(`${API_URL}/marca`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo marcas');
  }
};

export const fetchMarcaById = async (marcaId) => {
  try {
    const response = await axios.get(`${API_URL}/marca/${marcaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo marca');
  }
};

/* ******** ESPECIES ********** */
export const fetchEspecies = async () => {
  try {
    const response = await axios.get(`${API_URL}/especie`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo especies');
  }
};

export const fetchEspecieById = async (especieId) => {
  try {
    const response = await axios.get(`${API_URL}/especie/${especieId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo especie');
  }
};

/* ******** ETIQUETAS ********** */

export const fetchEtiquetas = async () => {
  try {
    const response = await axios.get(`${API_URL}/etiqueta`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo etiquetas');
  }
};

export const fetchEtiquetaById = async (etiquetaId) => {
  try {
    const response = await axios.get(`${API_URL}/etiqueta/${etiquetaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo etiqueta');
  }
};

/* ******** TALLAS ********** */

export const fetchTallas = async () => {
  try {
    const response = await axios.get(`${API_URL}/talla`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo tallas');
  }
};

export const fetchTallaById = async (tallaId) => {
  try {
    const response = await axios.get(`${API_URL}/talla/${tallaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo talla');
  }
};

/* ******** PESOS ********** */

export const fetchPesos = async () => {
  try {
    const response = await axios.get(`${API_URL}/peso`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo pesos');
  }
};

export const fetchPesoById = async (pesoId) => {
  try {
    const response = await axios.get(`${API_URL}/peso/${pesoId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo peso');
  }
};

/* ******** COLORES ********** */

export const fetchColors = async () => {
  try {
    const response = await axios.get(`${API_URL}/color`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo colors');
  }
};

export const fetchColorById = async (colorId) => {
  try {
    const response = await axios.get(`${API_URL}/color/${colorId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo color');
  }
};

/* ******** SERVICIOS ********** */

export const fetchServicios = async () => {
  try {
    const response = await axios.get(`${API_URL}/servicio`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo servicios');
  }
};

export const fetchServicioById = async (servicioId) => {
  try {
    const response = await axios.get(`${API_URL}/servicio/${servicioId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo servicio');
  }
};

/* ******** USUARIOS ********** */

export const fetchUsuarios = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuario`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo usuarios');
  }
};

export const fetchUsuarioById = async (usuarioId) => {
  try {
    const response = await axios.get(`${API_URL}/usuario/${usuarioId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo usuario');
  }
};

/* ******** PRODUCTOS ********** */

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

/* ******** VARIANTES ********** */

export const fetchVariantes = async () => {
  try {
    const response = await axios.get(`${API_URL}/variante`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo variantes');
  }
};

//src/services/api.js
export const fetchVariantesBajoStock = async () => {
  try {
    const response = await axios.get(`${API_URL}/variante/stock-bajo`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo variantes');
  }
};

export const fetchVarianteById = async (varianteId) => {
  try {
    const response = await axios.get(`${API_URL}/variante/${varianteId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo variante');
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

/* ******** COMPRAS ********** */

export const fetchCompras = async () => {
  try {
    const response = await axios.get(`${API_URL}/compra`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo compras');
  }
};

export const fetchCompraById = async (compraId) => {
  try {
    const response = await axios.get(`${API_URL}/compra/${compraId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo compra');
  }
};

/* ******** LOTES ********** */

export const fetchLotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/lote`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo lotes');
  }
};

export const fetchLoteById = async (loteId) => {
  try {
    const response = await axios.get(`${API_URL}/lote/${loteId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo lote');
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

export const fetchLotesByCompra = async (compraId) => {
  try {
    const response = await axios.get(`${API_URL}/lote/compra/${compraId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo lotes');
  }
};

/* ******** RAZAS ********** */

export const fetchRazas = async () => {
  try {
    const response = await axios.get(`${API_URL}/raza`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo razas');
  }
};

export const fetchRazaById = async (razaId) => {
  try {
    const response = await axios.get(`${API_URL}/raza/${razaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo raza');
  }
};




export const fetchRazasByEspecie = async (especieId, token) => {
  try {
    const response = await axios.get(`${API_URL}/raza/especie/${especieId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo razas por especie');
  }
  return response.json();
};