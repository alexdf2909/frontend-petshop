import { useState, useEffect } from "react";
import { fetchPesos, deletePeso, updatePeso, createPeso } from "../../../services/adminApi";
import PesoFormModal from "./PesoFormModal";
import './styles/tables.css';

const PesoTable = () => {
    const [pesos, setPesos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPeso, setCurrentPeso] = useState(null);

    useEffect(() => {
        loadPesos();
    }, []);

    const loadPesos = async () => {
        try {
            const fetchedPesos = await fetchPesos();
            setPesos(fetchedPesos);
        } catch (error) {
            console.error("Error cargando pesos:", error);
        }
    };

    const handleAdd = () => {
        setCurrentPeso(null);
        setShowModal(true);
    };

    const handleEditClick = (peso) => {
        setCurrentPeso(peso);
        setShowModal(true);
    };

    const handleDelete = async (pesoId, pesoName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la peso ${pesoName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deletePeso(pesoId);
            setPesos((prev) => prev.filter((peso) => peso.pesoId !== pesoId));
            loadPesos();
        } catch (error) {
            console.error("Error eliminando peso:", error);
        }
    };

    const handleSave = async (pesoData) => {
        try {
            if (currentPeso) {
                const updatedPeso = await updatePeso(currentPeso.pesoId, pesoData);
                setPesos((prev) =>
                    prev.map((peso) => (peso.pesoId === updatedPeso.pesoId ? updatedPeso : peso))
                );
            } else {
                const newPeso = await createPeso(pesoData);
                setPesos((prev) => [...prev, newPeso]);
            }
            setShowModal(false);
            setCurrentPeso(null);
            loadPesos();
        } catch (error) {
            console.error("Error guardando peso:", error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Gestión de Pesos</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nueva Peso
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Valor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pesos.map((peso) => (
                            <tr key={peso.id}>
                                <td data-label="ID">{peso.pesoId}</td>
                                <td data-label="Valor">{peso.valor}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(peso)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(peso.pesoId, peso.nombre)}
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
                <PesoFormModal
                    initialData={currentPeso}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentPeso(null);
                    }}
                />
            )}
        </div>
    );
};

export default PesoTable;