import { useState, useEffect } from 'react';
import './styles/modals.css';

const EtiquetaFormModal = ({ initialData, onSave, onClose }) => {
    const [etiqueta, setEtiqueta] = useState({
        nombre: '',
        etiquetaId: null
    });

    useEffect(() => {
        if (initialData) {
            setEtiqueta({
                nombre: initialData.nombre || '',
                etiquetaId: initialData.etiquetaId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEtiqueta(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedEtiqueta = {
                nombre: etiqueta.nombre
            };

            await onSave(formattedEtiqueta);
        } catch (err) {
            console.error('Error al guardar etiqueta', err);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Etiqueta' : 'Nueva Etiqueta'}</h2>
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
                                    value={etiqueta.nombre}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className='formActions'>
                            <button type="button" className='cancelButton' onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className='submitButton'>
                                {initialData
                                    ? 'Guardar Cambios'
                                    : 'Crear Etiqueta'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EtiquetaFormModal;