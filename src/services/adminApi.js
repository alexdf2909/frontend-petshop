//src/services/adminApi.js
import axios from './axiosConfig';

const API_URL = "http://localhost:8080";
// ==================== IMAGEN ========================
export const uploadImagen = async (formData) => {
    const res = await axios.post(`${API_URL}/imagen/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};

// ==================== CATEGORÍAS ====================
export const createCategoria = async (categoriaData) => {
  try {
    const response = await axios.post(`${API_URL}/categoria`, categoriaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la categoría');
  }
};

export const updateCategoria = async (categoriaId, categoriaData) => {
  try {
    const response = await axios.put(`${API_URL}/categoria/${categoriaId}`, categoriaData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando categoría');
  }
};

export const deleteCategoria = async (categoriaId) => {
  try {
    await axios.delete(`${API_URL}/categoria/${categoriaId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando categoría');
  }
};

// ==================== MARCAS ====================
export const createMarca = async (marcaData) => {
    try {
      const response = await axios.post(`${API_URL}/marca`, marcaData);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la marca');
    }
  };
  
  export const updateMarca = async (marcaId, marcaData) => {
    try {
      const response = await axios.put(`${API_URL}/marca/${marcaId}`, marcaData);
      return response.data;
    } catch (error) {
      throw new Error('Error actualizando marca');
    }
  };
  
  export const deleteMarca = async (marcaId) => {
    try {
      await axios.delete(`${API_URL}/marca/${marcaId}`);
      return true;
    } catch (error) {
      throw new Error('Error eliminando marca');
    }
  };

  // ==================== ESPECIES ====================
export const createEspecie = async (especieData) => {
    try {
      const response = await axios.post(`${API_URL}/especie`, especieData);
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la especie');
    }
  };
  
  export const updateEspecie = async (especieId, especieData) => {
    try {
      const response = await axios.put(`${API_URL}/especie/${especieId}`, especieData);
      return response.data;
    } catch (error) {
      throw new Error('Error actualizando especie');
    }
  };
  
  export const deleteEspecie = async (especieId) => {
    try {
      await axios.delete(`${API_URL}/especie/${especieId}`);
      return true;
    } catch (error) {
      throw new Error('Error eliminando especie');
    }
  };

    // ==================== ETIQUETAS ====================
export const createEtiqueta = async (etiquetaData) => {
  try {
    const response = await axios.post(`${API_URL}/etiqueta`, etiquetaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la etiqueta');
  }
};

export const updateEtiqueta = async (etiquetaId, etiquetaData) => {
  try {
    const response = await axios.put(`${API_URL}/etiqueta/${etiquetaId}`, etiquetaData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando etiqueta');
  }
};

export const deleteEtiqueta = async (etiquetaId) => {
  try {
    await axios.delete(`${API_URL}/etiqueta/${etiquetaId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando etiqueta');
  }
};

// ==================== TALLAS ====================
export const createTalla = async (tallaData) => {
  try {
    const response = await axios.post(`${API_URL}/talla`, tallaData);
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la talla');
  }
};
    
export const updateTalla = async (tallaId, tallaData) => {
  try {
    const response = await axios.put(`${API_URL}/talla/${tallaId}`, tallaData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando talla');
  }
};

export const deleteTalla = async (tallaId) => {
  try {
    await axios.delete(`${API_URL}/talla/${tallaId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando talla');
  }
};

// ==================== PESOS ====================
export const createPeso = async (pesoData) => {
  try {
    const response = await axios.post(`${API_URL}/peso`, pesoData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la peso');
  }
};

export const updatePeso = async (pesoId, pesoData) => {
  try {
    const response = await axios.put(`${API_URL}/peso/${pesoId}`, pesoData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando peso');
  }
};
        
export const deletePeso = async (pesoId) => {
  try {
    await axios.delete(`${API_URL}/peso/${pesoId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando peso');
  }
};

// ==================== COLORES ====================
export const createColor = async (colorData) => {
  try {
    const response = await axios.post(`${API_URL}/color`, colorData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la color');
  }
};

export const updateColor = async (colorId, colorData) => {
  try {
    const response = await axios.put(`${API_URL}/color/${colorId}`, colorData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando color');
  }
};
        
export const deleteColor = async (colorId) => {
  try {
    await axios.delete(`${API_URL}/color/${colorId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando color');
  }
};

// ==================== SERVICIOS ====================
export const createServicio = async (servicioData) => {
  try {
    const response = await axios.post(`${API_URL}/servicio`, servicioData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la servicio');
  }
};

export const updateServicio = async (servicioId, servicioData) => {
  try {
    const response = await axios.put(`${API_URL}/servicio/${servicioId}`, servicioData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando servicio');
  }
};
        
export const deleteServicio = async (servicioId) => {
  try {
    await axios.delete(`${API_URL}/servicio/${servicioId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando servicio');
  }
};

// ==================== USUARIOS ====================
export const createUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}/usuario`, usuarioData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la usuario');
  }
};

export const updateUsuario = async (usuarioId, usuarioData) => {
  try {
    const response = await axios.put(`${API_URL}/usuario/${usuarioId}`, usuarioData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando usuario');
  }
};
        
export const deleteUsuario = async (usuarioId) => {
  try {
    await axios.delete(`${API_URL}/usuario/${usuarioId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando usuario');
  }
};

// ==================== PRODUCTOS ====================
export const createProducto = async (productoData) => {
  try {
    const response = await axios.post(`${API_URL}/producto`, productoData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la producto');
  }
};

export const updateProducto = async (productoId, productoData) => {
  try {
    const response = await axios.put(`${API_URL}/producto/${productoId}`, productoData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando producto');
  }
};
        
export const deleteProducto = async (productoId) => {
  try {
    await axios.delete(`${API_URL}/producto/${productoId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando producto');
  }
};

// ==================== VARIANTES ====================
export const createVariante = async (varianteData) => {
  try {
    const response = await axios.post(`${API_URL}/variante`, varianteData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la variante');
  }
};

export const updateVariante = async (varianteId, varianteData) => {
  try {
    console.log(varianteData)
    const response = await axios.put(`${API_URL}/variante/${varianteId}`, varianteData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando variante');
  }
};
        
export const deleteVariante = async (varianteId) => {
  try {
    await axios.delete(`${API_URL}/variante/${varianteId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando variante');
  }
};

// ==================== COMPRAS ====================
export const createCompra = async (compraData) => {
  try {
    const response = await axios.post(`${API_URL}/compra`, compraData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la compra');
  }
};

export const updateCompra = async (compraId, compraData) => {
  try {
    const response = await axios.put(`${API_URL}/compra/${compraId}`, compraData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando compra');
  }
};
        
export const deleteCompra = async (compraId) => {
  try {
    await axios.delete(`${API_URL}/compra/${compraId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando compra');
  }
};

// ==================== LOTES ====================
export const createLote = async (loteData) => {
  try {
    const response = await axios.post(`${API_URL}/lote`, loteData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la lote');
  }
};

export const updateLote = async (loteId, loteData) => {
  try {
    const response = await axios.put(`${API_URL}/lote/${loteId}`, loteData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando lote');
  }
};
        
export const deleteLote = async (loteId) => {
  try {
    await axios.delete(`${API_URL}/lote/${loteId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando lote');
  }
};

// ==================== RAZAS ====================
export const createRaza = async (razaData) => {
  try {
    const response = await axios.post(`${API_URL}/raza`, razaData);
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la raza');
  }
};

export const updateRaza = async (razaId, razaData) => {
  try {
    const response = await axios.put(`${API_URL}/raza/${razaId}`, razaData);
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando raza');
  }
};
        
export const deleteRaza = async (razaId) => {
  try {
    await axios.delete(`${API_URL}/raza/${razaId}`);
    return true;
  } catch (error) {
    throw new Error('Error eliminando raza');
  }
};

// ==================== MASCOTAS ====================
export const createMascota = async (mascotaData, token) => {
  try {
    console.log("Datos que se envían al backend:", mascotaData);
    const response = await axios.post(`${API_URL}/mascota`, mascotaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear la mascota:', error.response?.data || error.message);
    throw new Error('Error al crear la mascota');
  }
};

export const updateMascota = async (mascotaId, mascotaData, token) => {
  try {
    const response = await axios.put(`${API_URL}/mascota/${mascotaId}`, mascotaData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando mascota');
  }
};

export const deleteMascota = async (mascotaId, token) => {
  try {
    await axios.delete(`${API_URL}/mascota/${mascotaId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando mascota');
  }
};

export const getMisMascotas = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/mascota/mis-mascotas`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las mascotas del usuario');
  }
};