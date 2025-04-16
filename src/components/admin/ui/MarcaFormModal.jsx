import { useState, useEffect } from 'react';
import { uploadImagen } from '../../../services/adminApi'; 

const MarcaFormModal = ({ initialData, onSave, onClose }) => {
    const [marca, setMarca] = useState({
        nombre: '',
        imagenUrl: '',
        marcaId: null
    });

    const [imagenFile, setImagenFile] = useState(null);
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    useEffect(() => {
        if (initialData) {
            setMarca({
                nombre: initialData.nombre || '',
                imagenUrl: initialData.imagenUrl || '',
                marcaId: initialData.marcaId
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMarca(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagenFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imagenUrl = marca.imagenUrl;

        try {
            if (imagenFile) {
                setSubiendoImagen(true);
                const formData = new FormData();
                formData.append('file', imagenFile);
                const url = await uploadImagen(formData);
                imagenUrl = url;
                setSubiendoImagen(false);
            }

            const formattedMarca = {
                nombre: marca.nombre,
                imagenUrl
            };

            await onSave(formattedMarca);
        } catch (err) {
            console.error('Error al subir imagen o guardar marca', err);
            setSubiendoImagen(false);
        }
    };

    return (
        <div >
            <div >
                <div >
                    <h2>{initialData ? 'Editar Marca' : 'Nueva Marca'}</h2>
                    <button  onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div >
                    <form onSubmit={handleSubmit} >
                        <div >
                            <label>
                                <span>Nombre</span>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={marca.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>

                        <div >
                            <label>
                                <span>Imagen</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>
                            {(imagenFile || marca.imagenUrl) && (
                                <div >
                                    <img
                                        src={
                                            imagenFile
                                                ? URL.createObjectURL(imagenFile)
                                                : marca.imagenUrl
                                        }
                                        alt="Vista previa"
                                       
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <button type="button" onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" disabled={subiendoImagen}>
                                {subiendoImagen
                                    ? 'Subiendo...'
                                    : initialData
                                    ? 'Guardar Cambios'
                                    : 'Crear Marca'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MarcaFormModal;