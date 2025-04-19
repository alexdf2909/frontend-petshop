import { useState, useEffect } from "react";
import { fetchServicios, deleteServicio, updateServicio, createServicio } from "../../../services/adminApi";
import ServicioFormModal from "./ServicioFormModal";
import './styles/tables.css';

const ServicioTable = () => {
    const [servicios, setServicios] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentServicio, setCurrentServicio] = useState(null);

    useEffect(() => {
        loadServicios();
    }, []);

    const loadServicios = async () => {
        try {
            const fetchedServicios = await fetchServicios();
            setServicios(fetchedServicios);
        } catch (error) {
            console.error("Error cargando servicios:", error);
        }
    };

    const handleAdd = () => {
        setCurrentServicio(null);
        setShowModal(true);
    };

    const handleEditClick = (servicio) => {
        setCurrentServicio(servicio);
        setShowModal(true);
    };

    const handleDelete = async (servicioId, servicioName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el servicio ${servicioName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteServicio(servicioId);
            setServicios((prev) => prev.filter((servicio) => servicio.servicioId !== servicioId));
            loadServicios();
        } catch (error) {
            console.error("Error eliminando servicio:", error);
        }
    };

    const handleSave = async (servicioData) => {
        try {
            if (currentServicio) {
                const updatedServicio = await updateServicio(currentServicio.servicioId, servicioData);
                setServicios((prev) =>
                    prev.map((servicio) => (servicio.servicioId === updatedServicio.servicioId ? updatedServicio : servicio))
                );
            } else {
                const newServicio = await createServicio(servicioData);
                setServicios((prev) => [...prev, newServicio]);
            }
            setShowModal(false);
            setCurrentServicio(null);
            loadServicios();
        } catch (error) {
            console.error("Error guardando servicio:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Servicios</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Servicio
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Horario</th>
                            <th>Antes</th>
                            <th>Después</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((servicio) => (
                            <tr key={servicio.servicioId}>
                                <td data-label="ID">{servicio.servicioId}</td>
                                <td data-label="Nombre">{servicio.nombre}</td>
                                <td data-label="Descripcion">{servicio.descripcion}</td>
                                <td data-label="Horario">{servicio.horario}</td>
                                <td data-label="ImagenAntes">
                                    {servicio.imagenAntes && (
                                        <img 
                                            src={servicio.imagenAntes} 
                                            alt={`Imagen de ${servicio.nombre}`} 
                                            className="iconImage"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </td>
                                <td data-label="ImagenDespues">
                                    {servicio.imagenDespues && (
                                        <img 
                                            src={servicio.imagenDespues} 
                                            alt={`Imagen de ${servicio.nombre}`} 
                                            className="iconImage"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(servicio)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(servicio.servicioId, servicio.nombre)}
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
                <ServicioFormModal
                    initialData={currentServicio}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentServicio(null);
                    }}
                />
            )}
        </div>
    );
};

export default ServicioTable;