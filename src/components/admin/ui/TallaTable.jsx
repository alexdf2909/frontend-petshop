import { useState, useEffect } from "react";
import { deleteTalla, updateTalla, createTalla } from "../../../services/adminApi";
import { fetchTallas} from "../../../services/api";
import TallaFormModal from "./TallaFormModal";
import './styles/tables.css';

const TallaTable = () => {
    const [tallas, setTallas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentTalla, setCurrentTalla] = useState(null);

    useEffect(() => {
        loadTallas();
    }, []);

    const loadTallas = async () => {
        try {
            const fetchedTallas = await fetchTallas();
            setTallas(fetchedTallas);
        } catch (error) {
            console.error("Error cargando tallas:", error);
        }
    };

    const handleAdd = () => {
        setCurrentTalla(null);
        setShowModal(true);
    };

    const handleEditClick = (talla) => {
        setCurrentTalla(talla);
        setShowModal(true);
    };

    const handleDelete = async (tallaId, tallaName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la talla ${tallaName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteTalla(tallaId);
            setTallas((prev) => prev.filter((talla) => talla.tallaId !== tallaId));
            loadTallas();
        } catch (error) {
            console.error("Error eliminando talla:", error);
        }
    };

    const handleSave = async (tallaData) => {
        try {
            if (currentTalla) {
                const updatedTalla = await updateTalla(currentTalla.tallaId, tallaData);
                setTallas((prev) =>
                    prev.map((talla) => (talla.tallaId === updatedTalla.tallaId ? updatedTalla : talla))
                );
            } else {
                const newTalla = await createTalla(tallaData);
                setTallas((prev) => [...prev, newTalla]);
            }
            setShowModal(false);
            setCurrentTalla(null);
            loadTallas();
        } catch (error) {
            console.error("Error guardando talla:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Tallas</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nueva Talla
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
                        {tallas.map((talla) => (
                            <tr key={talla.tallaId}>
                                <td data-label="ID">{talla.tallaId}</td>
                                <td data-label="Valor">{talla.valor}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(talla)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(talla.tallaId, talla.nombre)}
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
                <TallaFormModal
                    initialData={currentTalla}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentTalla(null);
                    }}
                />
            )}
        </div>
    );
};

export default TallaTable;