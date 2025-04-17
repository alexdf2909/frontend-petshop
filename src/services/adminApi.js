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