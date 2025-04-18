import { useState, useEffect } from 'react';
import './styles/modals.css';

const PesoFormModal = ({ initialData, onSave, onClose }) => {
    const [peso, setPeso] = useState({
        valor: '',
        pesoId: null
    });

    useEffect(() => {
        if (initialData) {
            setPeso({
                valor: initialData.valor || '',
                pesoId: initialData.pesoId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPeso(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedPeso = {
                valor: peso.valor
            };

            await onSave(formattedPeso);
        } catch (err) {
            console.error('Error al guardar peso', err);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Peso' : 'Nueva Peso'}</h2>
                    <button className='closeButton' onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className='scrollContainer'>
                    <form onSubmit={handleSubmit} className='form'>
                        <div className='formGroup'>
                            <label>
                                <span>Valor</span>
                                <input
                                    type="text"
                                    name="valor"
                                    value={peso.valor}
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
                                    : 'Crear Peso'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PesoFormModal;