import { useState, useEffect } from 'react';
import { fetchCategorias, fetchEspecies, fetchMarcas, fetchEtiquetas } from '../../../services/api';
import './styles/modals.css';
import MarcaFormModal from "./MarcaFormModal";
import CategoriaFormModal from "./CategoriaFormModal";
import EspecieFormModal from "./EspecieFormModal";
import EtiquetaFormModal from "./EtiquetaFormModal";
import { createMarca } from '../../../services/adminApi';
import { createCategoria } from '../../../services/adminApi';
import { createEspecie } from '../../../services/adminApi';
import { createEtiqueta } from '../../../services/adminApi';

const ProductoFormModal = ({ initialData, onSave, onClose }) => {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        especieId: '',
        marcaId: '',
        categoriaId: '',
        etiquetaIds: [],
        deleted: false,
        productoId: null
    });

    const [categorias, setCategorias] = useState([]);
    const [especies, setEspecies] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [etiquetas, setEtiquetas] = useState([]);


// Agrega estado para controlar el modal de marca
const [mostrarMarcaModal, setMostrarMarcaModal] = useState(false);
const [mostrarCategoriaModal, setMostrarCategoriaModal] = useState(false);
const [mostrarEspecieModal, setMostrarEspecieModal] = useState(false);
const [mostrarEtiquetaModal, setMostrarEtiquetaModal] = useState(false);




const handleMarcaSave = async (data) => {
    try {
        const marcaGuardada = await createMarca(data);
        setMarcas(prev => [...prev, marcaGuardada]);
        setProducto(prev => ({ ...prev, marcaId: marcaGuardada.marcaId }));
        setMostrarMarcaModal(false);  
    } catch (error) {
        console.error('Error al guardar la marca desde Producto:', error);
    }
};

const handleCategoriaSave = async (data) => {
    try {
        const categoriaGuardada = await createCategoria(data);
        setCategorias(prev => [...prev, categoriaGuardada]);
        setProducto(prev => ({ ...prev, categoriaId: categoriaGuardada.categoriaId }));
        setMostrarCategoriaModal(false);
    } catch (error) {
        console.error('Error al guardar la categoría desde Producto:', error);
    }
};

const handleEspecieSave = async (data) => {
    try {
        const especieGuardada = await createEspecie(data);
        setEspecies(prev => [...prev, especieGuardada]);
        setProducto(prev => ({ ...prev, especieId: especieGuardada.especieId }));
        setMostrarEspecieModal(false);
    } catch (error) {
        console.error('Error al guardar la especie desde Producto:', error);
    }
};

const handleEtiquetaSave = async (data) => {
    try {
        const etiquetaGuardada = await createEtiqueta(data);
        setEtiquetas(prev => [...prev, etiquetaGuardada]);
        setProducto(prev => ({
            ...prev,
            etiquetaIds: [...prev.etiquetaIds, etiquetaGuardada.etiquetaId]
        }));
        setMostrarEtiquetaModal(false);
    } catch (error) {
        console.error('Error al guardar la etiqueta desde Producto:', error);
    }
};



    useEffect(() => {
        if (initialData) {
            setProducto({
                nombre: initialData.nombre || '',
                descripcion: initialData.descripcion || '',
                especieId: initialData.especie.especieId || '',
                marcaId: initialData.marca.marcaId || '',
                categoriaId: initialData.categoria.categoriaId || '',
                etiquetaIds: initialData.etiquetas?.map(e => e.etiquetaId) || [],
                deleted: !!initialData.deleted,
                productoId: initialData.productoId
            });
        }
    }, [initialData]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [catRes, espRes, marRes, etiRes] = await Promise.all([
                    fetchCategorias(),
                    fetchEspecies(),
                    fetchMarcas(),
                    fetchEtiquetas()
                ]);
                setCategorias(catRes);
                setEspecies(espRes);
                setMarcas(marRes);
                setEtiquetas(etiRes);
            } catch (error) {
                console.error('Error cargando datos para el formulario:', error);
            }
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (type === 'checkbox' && name === 'deleted') {
            setProducto(prev => ({ ...prev, [name]: checked }));
        } else {
            setProducto(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleChangeEtiquetas = (e) => {
        const { value, checked } = e.target;
        const id = parseInt(value, 10);
        setProducto(prev => ({
            ...prev,
            etiquetaIds: checked
                ? [...prev.etiquetaIds, id]
                : prev.etiquetaIds.filter((etiquetaId) => etiquetaId !== id)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedProducto = {
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                especieId: parseInt(producto.especieId, 10),
                marcaId: parseInt(producto.marcaId, 10),
                categoriaId: parseInt(producto.categoriaId, 10),
                etiquetaIds: producto.etiquetaIds,
                deleted: producto.deleted,
                productoId: producto.productoId
            };
            await onSave(formattedProducto);
        } catch (err) {
            console.error('Error al guardar producto', err);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <button className='closeButton' onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className='scrollContainer'>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='formGroup'>
                            <label>
                                <span>Nombre</span>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={producto.nombre}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Descripción</span>
                                <textarea
                                    name="descripcion"
                                    value={producto.descripcion}
                                    onChange={handleChange}
                                    className='textarea'
                                    rows="4"
                                    required
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Categoría</span>
                                <div className='inputWithButton'>
                                    <select
                                        name="categoriaId"
                                        value={producto.categoriaId}
                                        onChange={handleChange}
                                        className='input'
                                        required
                                    >
                                        <option value="">Selecciona una Categoría</option>
                                        {categorias.map(c => (
                                        <option key={c.categoriaId} value={c.categoriaId}>{c.nombre}</option>
                                        ))}
                                    </select>
                                    <button type="button" onClick={() => setMostrarCategoriaModal(true)} className="miniButton">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Especie</span>
                                <div className='inputWithButton'>
                                    <select
                                        name="especieId"
                                        value={producto.especieId}
                                        onChange={handleChange}
                                        className='input'
                                        required
                                    >
                                        <option value="">Selecciona una Especie</option>
                                        {especies.map(e => (
                                        <option key={e.especieId} value={e.especieId}>{e.nombre}</option>
                                        ))}
                                    </select>
                                    <button type="button" onClick={() => setMostrarEspecieModal(true)} className="miniButton">
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Marca</span>
                                <div className='inputWithButton'>
                                    <select
                                        name="marcaId"
                                        value={producto.marcaId}
                                        onChange={handleChange}
                                        className='input'
                                        required
                                    >
                                        <option value="">Selecciona una Marca</option>
                                        {marcas.map(m => (
                                            <option key={m.marcaId} value={m.marcaId}>{m.nombre}</option>
                                        ))}
                                    </select>
                                    <button type="button" onClick={() => setMostrarMarcaModal(true)} className="miniButton">
                                    <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </label>
                        </div>

                        

                        <div className='formGroup'>
                            <label>
                                <div className='inputWithButton'>
                                    <span>Etiquetas</span>
                                    <button
                                        type="button"
                                        onClick={() => setMostrarEtiquetaModal(true)}
                                        className="miniButton etiquetaButton"
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>

                                {etiquetas.length > 0 ? (
                                etiquetas.map(etiqueta => (
                                    <div key={etiqueta.etiquetaId} className='checkboxContainer'>
                                    <label className='checkboxAttributeLabel'>
                                        <input
                                        type="checkbox"
                                        value={etiqueta.etiquetaId}
                                        checked={producto.etiquetaIds.includes(etiqueta.etiquetaId)}
                                        onChange={handleChangeEtiquetas}
                                        className='checkboxInput'
                                        />
                                        <span>{etiqueta.nombre}</span>
                                    </label>
                                    </div>
                                ))
                                ) : (
                                <p>No se ha registrado ninguna etiqueta.</p>
                                )}
                            </label>
                        </div>

                        <div className='formGroup'>
                        <span>Estado</span>
                            <label className='checkboxAttributeLabel'>
                                <input
                                    type="checkbox"
                                    name="deleted"
                                    checked={producto.deleted}
                                    onChange={handleChange}
                                    className='checkboxInput'
                                />
                                <span>Desactivar</span>
                            </label>
                        </div>

                        <div className='formActions'>
                            <button type="button" className='cancelButton' onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className='submitButton'>
                                {initialData ? 'Guardar Cambios' : 'Crear Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {mostrarMarcaModal && (
            <MarcaFormModal
                initialData={null}
                onSave={handleMarcaSave}
                onClose={() => setMostrarMarcaModal(false)}
            />
            )}

            {mostrarCategoriaModal && (
            <CategoriaFormModal
                initialData={null}
                onSave={handleCategoriaSave}
                onClose={() => setMostrarCategoriaModal(false)}
            />
            )}

            {mostrarEspecieModal && (
            <EspecieFormModal
                initialData={null}
                onSave={handleEspecieSave}
                onClose={() => setMostrarEspecieModal(false)}
            />
            )}

            {mostrarEtiquetaModal && (
            <EtiquetaFormModal
                initialData={null}
                onSave={handleEtiquetaSave}
                onClose={() => setMostrarEtiquetaModal(false)}
            />
            )}
        </div>
    );
};

export default ProductoFormModal;