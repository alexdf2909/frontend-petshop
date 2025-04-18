import { useState, useEffect } from "react";
import { fetchUsuarios, deleteUsuario, updateUsuario, createUsuario } from "../../../services/adminApi";
import UsuarioFormModal from "./UsuarioFormModal";
import './styles/tables.css';

const UsuarioTable = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUsuario, setCurrentUsuario] = useState(null);

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const fetchedUsuarios = await fetchUsuarios();
            setUsuarios(fetchedUsuarios);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        }
    };

    const handleAdd = () => {
        setCurrentUsuario(null);
        setShowModal(true);
    };

    const handleEditClick = (usuario) => {
        setCurrentUsuario(usuario);
        setShowModal(true);
    };

    const handleDelete = async (usuarioId, usuarioName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el usuario ${usuarioName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteUsuario(usuarioId);
            setUsuarios((prev) => prev.filter((usuario) => usuario.usuarioId !== usuarioId));
            loadUsuarios();
        } catch (error) {
            console.error("Error eliminando usuario:", error);
        }
    };

    const handleSave = async (usuarioData) => {
        try {
            if (currentUsuario) {
                const updatedUsuario = await updateUsuario(currentUsuario.usuarioId, usuarioData);
                setUsuarios((prev) =>
                    prev.map((usuario) => (usuario.usuarioId === updatedUsuario.usuarioId ? updatedUsuario : usuario))
                );
            } else {
                const newUsuario = await createUsuario(usuarioData);
                setUsuarios((prev) => [...prev, newUsuario]);
            }
            setShowModal(false);
            setCurrentUsuario(null);
            loadUsuarios();
        } catch (error) {
            console.error("Error guardando usuario:", error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Gestión de Usuarios</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Usuario
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Verificado</th>
                            <th>Desactivado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.usuarioId}>
                                <td data-label="ID">{usuario.usuarioId}</td>
                                <td data-label="Nombre">{usuario.nombre}</td>
                                <td data-label="Correo">{usuario.correo}</td>
                                <td data-label="Rol">{usuario.rol}</td>
                                <td data-label="Verificado">{usuario.verificado ? 'Sí' : 'No'}</td>
                                <td data-label="Desactivado">{usuario.deleted ? 'Sí' : 'No'}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(usuario)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(usuario.usuarioId, usuario.nombre)}
                                        aria-label="Eliminar"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <UsuarioFormModal
                    initialData={currentUsuario}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentUsuario(null);
                    }}
                />
            )}
        </div>
    );
};

export default UsuarioTable;