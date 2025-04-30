import { useState, useEffect } from 'react';
import './styles/modals.css';
import { uploadImagen } from '../../../services/adminApi';

const UsuarioFormModal = ({ initialData, onSave, onClose }) => {
    const [usuario, setUsuario] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        rol: '',
        deleted: false,
        imagenPerfil: '',
        usuarioId: null
    });

    useEffect(() => {
        if (initialData) {
            setUsuario({
                nombre: initialData.nombre || '',
                correo: initialData.correo || '',
                contrasena: '',
                rol: initialData.rol || '',
                deleted: !!initialData.deleted,
                imagenPerfil: initialData.imagenPerfil || '',
                usuarioId: initialData.usuarioId
            });
        }
    }, [initialData]);

    const [imagenFile, setImagenFile] = useState(null);
    const [subiendoImagen, setSubiendoImagen] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagenFile(file);
    };

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        const newValue = type === "checkbox" ? checked : value;
        setUsuario(prev => ({ ...prev, [name]: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        let imagenPerfil = usuario.imagenPerfil;
    
        try {
            if (imagenFile) {
                setSubiendoImagen(true);
                const formData = new FormData();
                formData.append('file', imagenFile);
                const url = await uploadImagen(formData);
                imagenPerfil = url;
                setSubiendoImagen(false);
            }
    
            const formattedUsuario = {
                nombre: usuario.nombre,
                correo: usuario.correo,
                contrasena: usuario.contrasena,
                rol: usuario.rol,
                deleted: !!usuario.deleted,
                imagenPerfil,
                usuarioId: usuario.usuarioId
            };
    
            await onSave(formattedUsuario);
        } catch (err) {
            console.error('Error al subir imagen o guardar usuario', err);
            setSubiendoImagen(false);
        }
    };

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
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
                                    value={usuario.nombre}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Correo</span>
                                <input
                                    type="email"
                                    name="correo"
                                    value={usuario.correo}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Contraseña</span>
                                <input
                                    type="password"
                                    name="contrasena"
                                    value={usuario.contrasena}
                                    onChange={handleChange}
                                    className='input'
                                    // No es requerido en edición, pero si en creación
                                />
                                <p className='passwordHelper'>
                                    {initialData ? "Dejar en blanco para mantener la contraseña actual." : "Contraseña requerida para nuevos usuarios."}
                                </p>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Rol</span>
                                <select
                                    name="rol"
                                    value={usuario.rol}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                >
                                    <option value="CLIENTE">Cliente</option>
                                    <option value="ADMIN">Administrador</option>
                                </select>
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

                            {(imagenFile || usuario.imagenPerfil) && (
                                <div className="previewContainer">
                                    <img
                                        src={
                                            imagenFile
                                                ? URL.createObjectURL(imagenFile)
                                                : usuario.imagenPerfil
                                        }
                                        alt="Vista previa"
                                        className="previewImage"
                                        onError={(e) => (e.target.style.display = 'none')}
                                    />
                                </div>
                            )}
                        </div>

                        <div className='formGroup'>
                            <label className='checkboxLabel'>
                                <input
                                    type="checkbox"
                                    name="deleted"
                                    checked={usuario.deleted}
                                    onChange={handleChange}
                                    className='checkboxInput'
                                />
                                <span>Desactivar</span>
                            </label>
                        </div>

                        <button type="submit" className='submitButton' disabled={subiendoImagen}>
                            {subiendoImagen
                                ? 'Subiendo...'
                                : initialData
                                ? 'Guardar Cambios'
                                : 'Crear Usuario'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UsuarioFormModal;
