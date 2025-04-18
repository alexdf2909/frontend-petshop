import axios from 'axios';

const API_URL = "http://localhost:8080";
// ==================== IMAGEN ========================
export const uploadImagen = async (formData) => {
    const res = await axios.post(`${API_URL}/imagen/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return res.data; // debería ser { url: '...' }
};

// ==================== CATEGORÍAS ====================
export const createCategoria = async (categoriaData) => {
  try {
    const response = await axios.post(`${API_URL}/categoria`, categoriaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la categoría');
  }
};

export const updateCategoria = async (categoriaId, categoriaData) => {
  try {
    const response = await axios.put(`${API_URL}/categoria/${categoriaId}`, categoriaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando categoría');
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

export const fetchCategoriaById = async (categoriaId) => {
  try {
    const response = await axios.get(`${API_URL}/categoria/${categoriaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo categoría');
  }
};

export const deleteCategoria = async (categoriaId) => {
  try {
    await axios.delete(`${API_URL}/categoria/${categoriaId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando categoría');
  }
};

// ==================== MARCAS ====================
export const createMarca = async (marcaData) => {
    try {
      const response = await axios.post(`${API_URL}/marca`, marcaData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la marca');
    }
  };
  
  export const updateMarca = async (marcaId, marcaData) => {
    try {
      const response = await axios.put(`${API_URL}/marca/${marcaId}`, marcaData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error actualizando marca');
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
  
  export const fetchMarcaById = async (marcaId) => {
    try {
      const response = await axios.get(`${API_URL}/marca/${marcaId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error obteniendo marca');
    }
  };
  
  export const deleteMarca = async (marcaId) => {
    try {
      await axios.delete(`${API_URL}/marca/${marcaId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return true;
    } catch (error) {
      throw new Error('Error eliminando marca');
    }
  };

  // ==================== ESPECIES ====================
export const createEspecie = async (especieData) => {
    try {
      const response = await axios.post(`${API_URL}/especie`, especieData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al crear la especie');
    }
  };
  
  export const updateEspecie = async (especieId, especieData) => {
    try {
      const response = await axios.put(`${API_URL}/especie/${especieId}`, especieData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Error actualizando especie');
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
  
  export const fetchEspecieById = async (especieId) => {
    try {
      const response = await axios.get(`${API_URL}/especie/${especieId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error obteniendo especie');
    }
  };
  
  export const deleteEspecie = async (especieId) => {
    try {
      await axios.delete(`${API_URL}/especie/${especieId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return true;
    } catch (error) {
      throw new Error('Error eliminando especie');
    }
  };

    // ==================== ETIQUETAS ====================
export const createEtiqueta = async (etiquetaData) => {
  try {
    const response = await axios.post(`${API_URL}/etiqueta`, etiquetaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la etiqueta');
  }
};

export const updateEtiqueta = async (etiquetaId, etiquetaData) => {
  try {
    const response = await axios.put(`${API_URL}/etiqueta/${etiquetaId}`, etiquetaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando etiqueta');
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

export const fetchEtiquetaById = async (etiquetaId) => {
  try {
    const response = await axios.get(`${API_URL}/etiqueta/${etiquetaId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error obteniendo etiqueta');
  }
};

export const deleteEtiqueta = async (etiquetaId) => {
  try {
    await axios.delete(`${API_URL}/etiqueta/${etiquetaId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando etiqueta');
  }
};

// ==================== TALLAS ====================
export const createTalla = async (tallaData) => {
  try {
    const response = await axios.post(`${API_URL}/talla`, tallaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear la talla');
  }
};
    
export const updateTalla = async (tallaId, tallaData) => {
  try {
    const response = await axios.put(`${API_URL}/talla/${tallaId}`, tallaData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando talla');
  }
};
    
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

export const deleteTalla = async (tallaId) => {
  try {
    await axios.delete(`${API_URL}/talla/${tallaId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando talla');
  }
};

// ==================== PESOS ====================
export const createPeso = async (pesoData) => {
  try {
    const response = await axios.post(`${API_URL}/peso`, pesoData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la peso');
  }
};

export const updatePeso = async (pesoId, pesoData) => {
  try {
    const response = await axios.put(`${API_URL}/peso/${pesoId}`, pesoData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando peso');
  }
};
        
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
        
export const deletePeso = async (pesoId) => {
  try {
    await axios.delete(`${API_URL}/peso/${pesoId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando peso');
  }
};

// ==================== COLORES ====================
export const createColor = async (colorData) => {
  try {
    const response = await axios.post(`${API_URL}/color`, colorData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la color');
  }
};

export const updateColor = async (colorId, colorData) => {
  try {
    const response = await axios.put(`${API_URL}/color/${colorId}`, colorData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando color');
  }
};
        
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
        
export const deleteColor = async (colorId) => {
  try {
    await axios.delete(`${API_URL}/color/${colorId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando color');
  }
};

// ==================== SERVICIOS ====================
export const createServicio = async (servicioData) => {
  try {
    const response = await axios.post(`${API_URL}/servicio`, servicioData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la servicio');
  }
};

export const updateServicio = async (servicioId, servicioData) => {
  try {
    const response = await axios.put(`${API_URL}/servicio/${servicioId}`, servicioData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando servicio');
  }
};
        
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
        
export const deleteServicio = async (servicioId) => {
  try {
    await axios.delete(`${API_URL}/servicio/${servicioId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando servicio');
  }
};

// ==================== USUARIOS ====================
export const createUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}/usuario`, usuarioData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la usuario');
  }
};

export const updateUsuario = async (usuarioId, usuarioData) => {
  try {
    const response = await axios.put(`${API_URL}/usuario/${usuarioId}`, usuarioData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando usuario');
  }
};
        
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
        
export const deleteUsuario = async (usuarioId) => {
  try {
    await axios.delete(`${API_URL}/usuario/${usuarioId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando usuario');
  }
};

// ==================== PRODUCTOS ====================
export const createProducto = async (productoData) => {
  try {
    const response = await axios.post(`${API_URL}/producto`, productoData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la producto');
  }
};

export const updateProducto = async (productoId, productoData) => {
  try {
    const response = await axios.put(`${API_URL}/producto/${productoId}`, productoData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando producto');
  }
};
        
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
        
export const deleteProducto = async (productoId) => {
  try {
    await axios.delete(`${API_URL}/producto/${productoId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando producto');
  }
};

// ==================== VARIANTES ====================
export const createVariante = async (varianteData) => {
  try {
    const response = await axios.post(`${API_URL}/variante`, varianteData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la variante');
  }
};

export const updateVariante = async (varianteId, varianteData) => {
  try {
    const response = await axios.put(`${API_URL}/variante/${varianteId}`, varianteData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando variante');
  }
};
        
export const fetchVariantes = async () => {
  try {
    const response = await axios.get(`${API_URL}/variante`);
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
        
export const deleteVariante = async (varianteId) => {
  try {
    await axios.delete(`${API_URL}/variante/${varianteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando variante');
  }
};

// ==================== COMPRAS ====================
export const createCompra = async (compraData) => {
  try {
    const response = await axios.post(`${API_URL}/compra`, compraData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la compra');
  }
};

export const updateCompra = async (compraId, compraData) => {
  try {
    const response = await axios.put(`${API_URL}/compra/${compraId}`, compraData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando compra');
  }
};
        
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
        
export const deleteCompra = async (compraId) => {
  try {
    await axios.delete(`${API_URL}/compra/${compraId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando compra');
  }
};

// ==================== LOTES ====================
export const createLote = async (loteData) => {
  try {
    const response = await axios.post(`${API_URL}/lote`, loteData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
 } catch (error) {
    throw new Error('Error al crear la lote');
  }
};

export const updateLote = async (loteId, loteData) => {
  try {
    const response = await axios.put(`${API_URL}/lote/${loteId}`, loteData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error actualizando lote');
  }
};
        
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
        
export const deleteLote = async (loteId) => {
  try {
    await axios.delete(`${API_URL}/lote/${loteId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return true;
  } catch (error) {
    throw new Error('Error eliminando lote');
  }
};