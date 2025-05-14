import { useState, useEffect } from "react";
import { deleteRaza, updateRaza, createRaza } from "../../../services/adminApi";
import { fetchRazas } from "../../../services/api";
import RazaFormModal from "./RazaFormModal";
import './styles/tables.css';

const RazaTable = () => {
    const [razas, setRazas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentRaza, setCurrentRaza] = useState(null);

    useEffect(() => {
        loadRazas();
    }, []);

    const loadRazas = async () => {
        try {
            const fetchedRazas = await fetchRazas();
            setRazas(fetchedRazas);
        } catch (error) {
            console.error("Error cargando razas:", error);
        }
    };

    const handleAdd = () => {
        setCurrentRaza(null);
        setShowModal(true);
    };

    const handleEditClick = (raza) => {
        setCurrentRaza(raza);
        setShowModal(true);
    };

    const handleDelete = async (razaId, razaName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el raza ${razaName}? Los razas asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteRaza(razaId);
            setRazas((prev) => prev.filter((raza) => raza.razaId !== razaId));
            loadRazas();
        } catch (error) {
            console.error("Error eliminando raza:", error);
        }
    };

    const handleSave = async (razaData) => {
        try {
            if (currentRaza) {
                const updatedRaza = await updateRaza(currentRaza.razaId, razaData);
                setRazas((prev) =>
                    prev.map((raza) => (raza.razaId === updatedRaza.razaId ? updatedRaza : raza))
                );
            } else {
                const newRaza = await createRaza(razaData);
                setRazas((prev) => [...prev, newRaza]);
            }
            setShowModal(false);
            setCurrentRaza(null);
            loadRazas();
        } catch (error) {
            console.error("Error guardando raza:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Razas</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Raza
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {razas.map((raza) => (
                            <tr key={raza.razaId}>
                                <td data-label="ID">{raza.razaId}</td>
                                <td data-label="Nombre">{raza.nombre}</td>
                                <td data-label="Especie">{raza.especie?.nombre ?? '-'}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(raza)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(raza.razaId, raza.nombre)}
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
                <RazaFormModal
                    initialData={currentRaza}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentRaza(null);
                    }}
                />
            )}
        </div>
    );
};

export default RazaTable;