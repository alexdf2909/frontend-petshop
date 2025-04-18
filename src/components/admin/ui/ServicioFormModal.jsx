import { useState, useEffect } from 'react';
import { uploadImagen } from '../../../services/adminApi'; 
import './styles/modals.css';

const ServicioFormModal = ({ initialData, onSave, onClose }) => {
    const [servicio, setServicio] = useState({
        nombre: '',
        descripcion: '',
        imagenAntes: '',
        imagenDespues: '',
        horario: '',
        servicioId: null
    });

    const [imagenAntesFile, setImagenAntesFile] = useState(null);
    const [imagenDespuesFile, setImagenDespuesFile] = useState(null);
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    useEffect(() => {
        if (initialData) {
            setServicio({
                nombre: initialData.nombre || '',
                descripcion: initialData.descripcion || '',
                imagenAntes: initialData.imagenAntes || '',
                imagenDespues: initialData.imagenDespues || '',
                horario: initialData.horario || '',
                servicioId: initialData.servicioId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServicio(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, tipo) => {
        const file = e.target.files[0];
        if (file) {
            if (tipo === 'antes') setImagenAntesFile(file);
            else if (tipo === 'despues') setImagenDespuesFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let imagenAntesUrl = servicio.imagenAntes;
        let imagenDespuesUrl = servicio.imagenDespues;
    
        try {
            setSubiendoImagen(true);
    
            if (imagenAntesFile) {
                const formDataAntes = new FormData();
                formDataAntes.append('file', imagenAntesFile);
                imagenAntesUrl = await uploadImagen(formDataAntes);
            }
    
            if (imagenDespuesFile) {
                const formDataDespues = new FormData();
                formDataDespues.append('file', imagenDespuesFile);
                imagenDespuesUrl = await uploadImagen(formDataDespues);
            }
    
            const formattedServicio = {
                nombre: servicio.nombre,
                descripcion: servicio.descripcion,
                imagenAntes: imagenAntesUrl,
                imagenDespues: imagenDespuesUrl,
                horario: servicio.horario,
                servicioId: servicio.servicioId
            };
    
            await onSave(formattedServicio);
        } catch (err) {
            console.error('Error al subir imagen o guardar servicio', err);
        } finally {
            setSubiendoImagen(false);
        }
    };
    

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Servicio' : 'Nuevo Servicio'}</h2>
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
                                    value={servicio.nombre}
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
                                    value={servicio.descripcion}
                                    onChange={handleChange}
                                    className='textarea'
                                    rows="4"
                                    required
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Horario</span>
                                <input
                                    type="text"
                                    name="horario"
                                    value={servicio.horario}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className="formGroup">
                            <label className="customFileLabel">
                                <span>Imagen Antes</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'antes')}
                                    className="fileInput"
                                />
                            </label>
                            {(imagenAntesFile  || servicio.imagenAntes) && (
                                <div className="previewContainer">
                                    <img
                                        src={
                                            imagenAntesFile 
                                                ? URL.createObjectURL(imagenAntesFile)
                                                : servicio.imagenAntes
                                        }
                                        alt="Vista previa"
                                        className="previewImage"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="formGroup">
                            <label className="customFileLabel">
                                <span>Imagen Después</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'despues')}
                                    className="fileInput"
                                />
                            </label>
                            {(imagenDespuesFile  || servicio.imagenDespues) && (
                                <div className="previewContainer">
                                    <img
                                        src={
                                            imagenDespuesFile 
                                                ? URL.createObjectURL(imagenDespuesFile )
                                                : servicio.imagenDespues
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
                                    : 'Crear Servicio'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServicioFormModal;