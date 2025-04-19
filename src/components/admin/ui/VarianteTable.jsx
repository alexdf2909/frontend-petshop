import { useState, useEffect } from "react";
import { fetchVariantes, deleteVariante, updateVariante, createVariante } from "../../../services/adminApi";
import VarianteFormModal from "./VarianteFormModal";
import './styles/tables.css';

const VarianteTable = () => {
    const [variantes, setVariantes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentVariante, setCurrentVariante] = useState(null);

    useEffect(() => {
        loadVariantes();
    }, []);

    const loadVariantes = async () => {
        try {
            const fetchedVariantes = await fetchVariantes();
            setVariantes(fetchedVariantes);
        } catch (error) {
            console.error("Error cargando variantes:", error);
        }
    };

    const handleAdd = () => {
        setCurrentVariante(null);
        setShowModal(true);
    };

    const handleEditClick = (variante) => {
        setCurrentVariante(variante);
        setShowModal(true);
    };

    const handleDelete = async (varianteId, varianteName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el variante ${varianteName}? Los variantes asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteVariante(varianteId);
            setVariantes((prev) => prev.filter((variante) => variante.varianteId !== varianteId));
            loadVariantes();
        } catch (error) {
            console.error("Error eliminando variante:", error);
        }
    };

    const handleSave = async (varianteData) => {
        try {
            if (currentVariante) {
                const updatedVariante = await updateVariante(currentVariante.varianteId, varianteData);
                setVariantes((prev) =>
                    prev.map((variante) => (variante.varianteId === updatedVariante.varianteId ? updatedVariante : variante))
                );
            } else {
                const newVariante = await createVariante(varianteData);
                setVariantes((prev) => [...prev, newVariante]);
            }
            setShowModal(false);
            setCurrentVariante(null);
            loadVariantes();
        } catch (error) {
            console.error("Error guardando variante:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Variantes</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Variante
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Peso</th>
                            <th>Color</th>
                            <th>Talla</th>
                            <th>Precio</th>
                            <th>Desactivado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variantes.map((variante) => (
                            <tr key={variante.varianteId}>
                                <td data-label="ID">{variante.varianteId}</td>
                                <td data-label="Producto">{variante.producto.nombre}</td>
                                <td data-label="Peso">{variante.peso?.valor ?? '-'}</td>
                                <td data-label="Color">{variante.color?.valor ?? '-'}</td>
                                <td data-label="Talla">{variante.talla?.valor ?? '-'}</td>
                                <td data-label="Precio">{variante.precioOferta}</td>
                                <td data-label="Desactivado">{variante.deleted ? 'Sí' : 'No'}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(variante)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(variante.varianteId, variante.nombre)}
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
                <VarianteFormModal
                    initialData={currentVariante}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentVariante(null);
                    }}
                />
            )}
        </div>
    );
};

export default VarianteTable;