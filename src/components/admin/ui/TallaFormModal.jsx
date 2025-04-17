import { useState, useEffect } from 'react';
import './styles/modals.css';

const TallaFormModal = ({ initialData, onSave, onClose }) => {
    const [talla, setTalla] = useState({
        valor: '',
        tallaId: null
    });

    useEffect(() => {
        if (initialData) {
            setTalla({
                valor: initialData.valor || '',
                tallaId: initialData.tallaId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTalla(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formattedTalla = {
                valor: talla.valor
            };

            await onSave(formattedTalla);
        } catch (err) {
            console.error('Error al guardar talla', err);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Talla' : 'Nueva Talla'}</h2>
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
                                    value={talla.valor}
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
                                    : 'Crear Talla'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TallaFormModal;