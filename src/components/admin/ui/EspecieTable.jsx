import { useState, useEffect } from "react";
import { deleteEspecie, updateEspecie, createEspecie } from "../../../services/adminApi";
import { fetchEspecies} from "../../../services/api";
import EspecieFormModal from "./EspecieFormModal";
import './styles/tables.css';

const EspecieTable = () => {
    const [especies, setEspecies] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentEspecie, setCurrentEspecie] = useState(null);

    useEffect(() => {
        loadEspecies();
    }, []);

    const loadEspecies = async () => {
        try {
            const fetchedEspecies = await fetchEspecies();
            setEspecies(fetchedEspecies);
        } catch (error) {
            console.error("Error cargando especies:", error);
        }
    };

    const handleAdd = () => {
        setCurrentEspecie(null);
        setShowModal(true);
    };

    const handleEditClick = (especie) => {
        setCurrentEspecie(especie);
        setShowModal(true);
    };

    const handleDelete = async (especieId, especieName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la especie ${especieName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteEspecie(especieId);
            setEspecies((prev) => prev.filter((especie) => especie.especieId !== especieId));
            loadEspecies();
        } catch (error) {
            console.error("Error eliminando especie:", error);
        }
    };

    const handleSave = async (especieData) => {
        try {
            if (currentEspecie) {
                const updatedEspecie = await updateEspecie(currentEspecie.especieId, especieData);
                setEspecies((prev) =>
                    prev.map((especie) => (especie.especieId === updatedEspecie.especieId ? updatedEspecie : especie))
                );
            } else {
                const newEspecie = await createEspecie(especieData);
                setEspecies((prev) => [...prev, newEspecie]);
            }
            setShowModal(false);
            setCurrentEspecie(null);
            loadEspecies();
        } catch (error) {
            console.error("Error guardando especie:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Especies</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nueva Especie
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
                        {especies.map((especie) => (
                            <tr key={especie.especieId}>
                                <td data-label="ID">{especie.especieId}</td>
                                <td data-label="Nombre">{especie.nombre}</td>
                                <td data-label="URL">{especie.imagenUrl}</td>
                                <td data-label="Imagen">
                                    {especie.imagenUrl && (
                                        <img 
                                            src={especie.imagenUrl} 
                                            alt={`Imagen de ${especie.nombre}`} 
                                            className="iconImage"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(especie)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(especie.especieId, especie.nombre)}
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
                <EspecieFormModal
                    initialData={currentEspecie}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentEspecie(null);
                    }}
                />
            )}
        </div>
    );
};

export default EspecieTable;