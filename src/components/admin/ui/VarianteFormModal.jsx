import { useState, useEffect } from 'react';
import { uploadImagen } from '../../../services/adminApi'; // Asegúrate de tener esta función correctamente configurada
import {
    fetchPesos,
    fetchColors,
    fetchTallas,
    fetchProductos
} from '../../../services/adminApi';
import './styles/modals.css';

const VarianteFormModal = ({ initialData, onSave, onClose }) => {
    const [variante, setVariante] = useState({
        productoId: '',
        colorId: '',
        tallaId: '',
        pesoId: '',
        precioOriginal: '',
        precioOferta: '',
        imagenes: [],
        deleted: false,
        varianteId: null
    });

    const [imagenFiles, setImagenFiles] = useState([]);
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    const [pesos, setPesos] = useState([]);
    const [colors, setColors] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        if (initialData) {
            setVariante({
                productoId: initialData.producto.productoId || '',
                colorId: initialData.color?.colorId || '',
                tallaId: initialData.talla?.tallaId || '',
                pesoId: initialData.peso?.pesoId || '',
                precioOriginal: initialData.precioOriginal || '',
                precioOferta: initialData.precioOferta || '',
                imagenes: initialData.imagenes || [],
                deleted: !!initialData.deleted,
                varianteId: initialData.varianteId
            });
        }
    }, [initialData]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [catRes, espRes, marRes, proRes] = await Promise.all([
                    fetchPesos(),
                    fetchColors(),
                    fetchTallas(),
                    fetchProductos(),
                ]);
                setPesos(catRes);
                setColors(espRes);
                setTallas(marRes);
                setProductos(proRes)
            } catch (error) {
                console.error('Error cargando datos para el formulario:', error);
            }
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (type === 'checkbox' && name === 'deleted') {
            setVariante(prev => ({ ...prev, [name]: checked }));
        } else {
            setVariante(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImagenFiles(prevFiles => [...prevFiles, ...files]);
    };

    const handleRemoveImage = (index) => {
        setImagenFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imagenesUrl = variante.imagenes.map(img =>
                typeof img === 'string' ? img : img.imagenUrl
            );

            if (imagenFiles.length > 0) {
                setSubiendoImagen(true);
                // Subir cada imagen y obtener la URL
                for (const file of imagenFiles) {
                    const formData = new FormData();
                    formData.append('file', file);
                    const imageUrl = await uploadImagen(formData);
                    imagenesUrl.push(imageUrl);
                }
                setSubiendoImagen(false);
            }

            const formattedVariante = {
                productoId: parseInt(variante.productoId, 10),
                colorId: parseInt(variante.colorId, 10),
                tallaId: parseInt(variante.tallaId, 10),
                pesoId: parseInt(variante.pesoId, 10),
                precioOriginal: parseFloat(variante.precioOriginal),
                precioOferta: parseFloat(variante.precioOferta),
                imagenes: imagenesUrl,
                deleted: variante.deleted,
                varianteId: variante.varianteId
            };
            await onSave(formattedVariante);
        } catch (err) {
            console.error('Error al subir imagen o guardar variante', err);
            setSubiendoImagen(false);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Variante' : 'Nueva Variante'}</h2>
                    <button className='closeButton' onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className='scrollContainer'>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='formGroup'>
                            <label>
                                <span>Producto</span>
                                <select
                                    name="productoId"
                                    value={variante.productoId}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                    disabled={!!initialData}
                                >
                                    <option value="">Selecciona un Producto</option>
                                    {productos.map(c => (
                                        <option key={c.productoId} value={c.productoId}>{c.nombre}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Peso</span>
                                <select
                                    name="pesoId"
                                    value={variante.pesoId || ''}
                                    onChange={handleChange}
                                    className='input'
                                >
                                    <option value="">Selecciona un Peso</option>
                                    {pesos.map(c => (
                                        <option key={c.pesoId} value={c.pesoId}>{c.valor}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Color</span>
                                <select
                                    name="colorId"
                                    value={variante.colorId || ''}
                                    onChange={handleChange}
                                    className='input'
                                >
                                    <option value="">Selecciona una Color</option>
                                    {colors.map(e => (
                                        <option key={e.colorId} value={e.colorId}>{e.valor}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Talla</span>
                                <select
                                    name="tallaId"
                                    value={variante.tallaId || ''}
                                    onChange={handleChange}
                                    className='input'
                                >
                                    <option value="">Selecciona una Talla</option>
                                    {tallas.map(m => (
                                        <option key={m.tallaId} value={m.tallaId}>{m.valor}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Precio Original</span>
                                <div className='priceInput'>
                                    <span className='currency'>S/.</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="precioOriginal"
                                        value={variante.precioOriginal}
                                        onChange={handleChange}
                                        className='input'
                                        required
                                        min="0.01"
                                    />
                                </div>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Precio Oferta</span>
                                <div className='priceInput'>
                                    <span className='currency'>S/.</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="precioOferta"
                                        value={variante.precioOferta}
                                        onChange={handleChange}
                                        className='input'
                                        required
                                        min="0.01"
                                    />
                                </div>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label><span>Imágenes</span></label>
                            <div className='imageInputContainer'>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="fileInput"
                                />
                            </div>

                            <div className='imageGrid'>
                                {imagenFiles.map((img, index) => (
                                    <div key={index} className='imageItem'>
                                        <img
                                            src={URL.createObjectURL(img)}
                                            alt={`Imagen ${index + 1}`}
                                            className='imagePreview'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className='removeButton'
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                                {variante.imagenes.map((img, index) => (
                                    <div key={index} className='imageItem'>
                                        <img
                                            src={typeof img === 'string' ? img : img.imagenUrl}
                                            alt={`Imagen ${index + 1}`}
                                            className='imagePreview'
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className='removeButton'
                                        >
                                            x
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='formGroup'>
                            <label className='checkboxLabel'>
                                <input
                                    type="checkbox"
                                    name="deleted"
                                    checked={variante.deleted}
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
                            <button type="submit" className='submitButton' disabled={subiendoImagen}>
                                {subiendoImagen ? 'Subiendo...' : initialData ? 'Guardar Cambios' : 'Crear Variante'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VarianteFormModal;
