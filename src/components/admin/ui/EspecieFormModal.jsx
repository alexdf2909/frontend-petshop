import { useState, useEffect } from 'react';
import { uploadImagen } from '../../../services/adminApi'; 
import './styles/modals.css';

const EspecieFormModal = ({ initialData, onSave, onClose }) => {
    const [especie, setEspecie] = useState({
        nombre: '',
        imagenUrl: '',
        especieId: null
    });

    const [imagenFile, setImagenFile] = useState(null);
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    useEffect(() => {
        if (initialData) {
            setEspecie({
                nombre: initialData.nombre || '',
                imagenUrl: initialData.imagenUrl || '',
                especieId: initialData.especieId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEspecie(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagenFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imagenUrl = especie.imagenUrl;

        try {
            if (imagenFile) {
                setSubiendoImagen(true);
                const formData = new FormData();
                formData.append('file', imagenFile);
                const url = await uploadImagen(formData);
                imagenUrl = url;
                setSubiendoImagen(false);
            }

            const formattedEspecie = {
                nombre: especie.nombre,
                imagenUrl
            };

            await onSave(formattedEspecie);
        } catch (err) {
            console.error('Error al subir imagen o guardar especie', err);
            setSubiendoImagen(false);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Especie' : 'Nueva Especie'}</h2>
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
                                    value={especie.nombre}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className="formGroup">
                            <label className="customFileLabel">
                                <span>Imagen</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="fileInput"
                                />
                            </label>
                            {(imagenFile || especie.imagenUrl) && (
                                <div className="previewContainer">
                                    <img
                                        src={
                                            imagenFile
                                                ? URL.createObjectURL(imagenFile)
                                                : especie.imagenUrl
                                        }
                                        alt="Vista previa"
                                        className="previewImage"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        <div className='formActions'>
                            <button type="button" className='cancelButton' onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className='submitButton' disabled={subiendoImagen}>
                                {subiendoImagen
                                    ? 'Subiendo...'
                                    : initialData
                                    ? 'Guardar Cambios'
                                    : 'Crear Especie'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EspecieFormModal;