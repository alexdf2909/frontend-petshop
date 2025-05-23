import { useState, useEffect } from "react";
import { deleteMarca, updateMarca, createMarca } from "../../../services/adminApi";
import { fetchMarcas } from "../../../services/api";
import MarcaFormModal from "./MarcaFormModal";
import './styles/tables.css';

const MarcaTable = () => {
    const [marcas, setMarcas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentMarca, setCurrentMarca] = useState(null);

    useEffect(() => {
        loadMarcas();
    }, []);

    const loadMarcas = async () => {
        try {
            const fetchedMarcas = await fetchMarcas();
            setMarcas(fetchedMarcas);
        } catch (error) {
            console.error("Error cargando marcas:", error);
        }
    };

    const handleAdd = () => {
        setCurrentMarca(null);
        setShowModal(true);
    };

    const handleEditClick = (marca) => {
        setCurrentMarca(marca);
        setShowModal(true);
    };

    const handleDelete = async (marcaId, marcaName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la marca ${marcaName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteMarca(marcaId);
            setMarcas((prev) => prev.filter((marca) => marca.marcaId !== marcaId));
            loadMarcas();
        } catch (error) {
            console.error("Error eliminando marca:", error);
        }
    };

    const handleSave = async (marcaData) => {
        try {
            if (currentMarca) {
                const updatedMarca = await updateMarca(currentMarca.marcaId, marcaData);
                setMarcas((prev) =>
                    prev.map((marca) => (marca.marcaId === updatedMarca.marcaId ? updatedMarca : marca))
                );
            } else {
                const newMarca = await createMarca(marcaData);
                setMarcas((prev) => [...prev, newMarca]);
            }
            setShowModal(false);
            setCurrentMarca(null);
            loadMarcas();
        } catch (error) {
            console.error("Error guardando marca:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Marcas</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nueva Marca
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>URL</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marcas.map((marca) => (
                            <tr key={marca.marcaId}>
                                <td data-label="ID">{marca.marcaId}</td>
                                <td data-label="Nombre">{marca.nombre}</td>
                                <td data-label="URL">{marca.imagenUrl}</td>
                                <td data-label="Imagen">
                                    {marca.imagenUrl && (
                                        <img 
                                            src={marca.imagenUrl} 
                                            alt={`Imagen de ${marca.nombre}`} 
                                            className="iconImage"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(marca)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(marca.marcaId, marca.nombre)}
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
                <MarcaFormModal
                    initialData={currentMarca}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentMarca(null);
                    }}
                />
            )}
        </div>
    );
};

export default MarcaTable;