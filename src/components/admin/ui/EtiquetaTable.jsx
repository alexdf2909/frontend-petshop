import { useState, useEffect } from "react";
import { deleteEtiqueta, updateEtiqueta, createEtiqueta } from "../../../services/adminApi";
import { fetchEtiquetas } from "../../../services/api";
import EtiquetaFormModal from "./EtiquetaFormModal";
import './styles/tables.css';

const EtiquetaTable = () => {
    const [etiquetas, setEtiquetas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEtiqueta, setCurrentEtiqueta] = useState(null);

    useEffect(() => {
        loadEtiquetas();
    }, []);

    const loadEtiquetas = async () => {
        try {
            const fetchedEtiquetas = await fetchEtiquetas();
            setEtiquetas(fetchedEtiquetas);
        } catch (error) {
            console.error("Error cargando etiquetas:", error);
        }
    };

    const handleAdd = () => {
        setCurrentEtiqueta(null);
        setShowModal(true);
    };

    const handleEditClick = (etiqueta) => {
        setCurrentEtiqueta(etiqueta);
        setShowModal(true);
    };

    const handleDelete = async (etiquetaId, etiquetaName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la etiqueta ${etiquetaName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteEtiqueta(etiquetaId);
            setEtiquetas((prev) => prev.filter((etiqueta) => etiqueta.etiquetaId !== etiquetaId));
            loadEtiquetas();
        } catch (error) {
            console.error("Error eliminando etiqueta:", error);
        }
    };

    const handleSave = async (etiquetaData) => {
        try {
            if (currentEtiqueta) {
                const updatedEtiqueta = await updateEtiqueta(currentEtiqueta.etiquetaId, etiquetaData);
                setEtiquetas((prev) =>
                    prev.map((etiqueta) => (etiqueta.etiquetaId === updatedEtiqueta.etiquetaId ? updatedEtiqueta : etiqueta))
                );
            } else {
                const newEtiqueta = await createEtiqueta(etiquetaData);
                setEtiquetas((prev) => [...prev, newEtiqueta]);
            }
            setShowModal(false);
            setCurrentEtiqueta(null);
            loadEtiquetas();
        } catch (error) {
            console.error("Error guardando etiqueta:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Etiquetas</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nueva Etiqueta
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {etiquetas.map((etiqueta) => (
                            <tr key={etiqueta.etiquetaId}>
                                <td data-label="ID">{etiqueta.etiquetaId}</td>
                                <td data-label="Nombre">{etiqueta.nombre}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(etiqueta)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(etiqueta.etiquetaId, etiqueta.nombre)}
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
                <EtiquetaFormModal
                    initialData={currentEtiqueta}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentEtiqueta(null);
                    }}
                />
            )}
        </div>
    );
};

export default EtiquetaTable;