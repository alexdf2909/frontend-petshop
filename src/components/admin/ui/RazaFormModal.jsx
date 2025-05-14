import { useState, useEffect } from 'react';
import { fetchEspecies } from '../../../services/api';
import './styles/modals.css';

const RazaFormModal = ({ initialData, onSave, onClose }) => {
    const [raza, setRaza] = useState({
        nombre: '',
        especieId: '',
        razaId: null
    });

    const [especies, setEspecies] = useState([]);

    useEffect(() => {
        if (initialData) {
            setRaza({
                nombre: initialData.nombre || '',
                especieId: initialData.especie?.especieId || '',
                razaId: initialData.razaId
            });
        }
    }, [initialData]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [ espRes] = await Promise.all([
                    fetchEspecies()
                ]);
                setEspecies(espRes);
            } catch (error) {
                console.error('Error cargando datos para el formulario:', error);
            }
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (type === 'checkbox' && name === 'deleted') {
            setRaza(prev => ({ ...prev, [name]: checked }));
        } else {
            setRaza(prev => ({ ...prev, [name]: value }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedRaza = {
                nombre: raza.nombre,
                especieId: parseInt(raza.especieId, 10),
                razaId: raza.razaId
            };
            await onSave(formattedRaza);
        } catch (err) {
            console.error('Error al guardar raza', err);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Raza' : 'Nuevo Raza'}</h2>
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
                                    value={raza.nombre}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Especie</span>
                                <select
                                    name="especieId"
                                    value={raza.especieId}
                                    onChange={handleChange}
                                    className='input'
                                >
                                    <option value="">Selecciona una Especie</option>
                                    {especies.map(e => (
                                        <option key={e.especieId} value={e.especieId}>{e.nombre}</option>
                                    ))}
                                </select>
                            </label>
                        </div>


                        <div className='formActions'>
                            <button type="button" className='cancelButton' onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className='submitButton'>
                                {initialData ? 'Guardar Cambios' : 'Crear Raza'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RazaFormModal;