// VarianteTable.jsx
import { useState, useEffect } from "react";
import { fetchVariantesByProducto, deleteVariante, updateVariante, createVariante } from "../../../services/adminApi";
import VarianteFormModal from "./VarianteFormModal";
import './styles/tables.css';

const VarianteTable = ({ productoId }) => {
    const [variantes, setVariantes] = useState([]);
    const [showModalvariante, setShowModalvariante] = useState(false);
    const [currentVariante, setCurrentVariante] = useState(null);

    useEffect(() => {
        if (productoId) {
            loadVariantes();
        }
    }, [productoId]);

    const loadVariantes = async () => {
        try {
            const fetchedVariantes = await fetchVariantesByProducto(productoId);
            setVariantes(fetchedVariantes);
        } catch (error) {
            console.error("Error cargando variantes:", error);
        }
    };

    const handleAdd = () => {
        console.log("Abriendo el modal para crear");
        console.log(showModalvariante);
        setCurrentVariante(null);
        setShowModalvariante(true);
        console.log(showModalvariante);
    };

    const handleEditClick = (variante) => {
        console.log("Abriendo el modal para crear");
        console.log(showModalvariante);
        setCurrentVariante(variante);
        setShowModalvariante(true);
        console.log(showModalvariante);
    };

    const handleClose = () => {
        console.log("Cerrando el modal");
        console.log(showModalvariante);
        setShowModalvariante(false);
        setCurrentVariante(null); // limpia también los datos previos
        console.log(showModalvariante);
    };

    const handleDelete = async (varianteId) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar esta variante?`);
        if (!confirmDelete) return;
        try {
            await deleteVariante(varianteId);
            loadVariantes();
        } catch (error) {
            console.error("Error eliminando variante:", error);
        }
    };

    const handleSave = async (varianteData) => {
        try {
            if (currentVariante) {
                await updateVariante(currentVariante.varianteId, varianteData);
            } else {
                await createVariante({ ...varianteData, productoId });
            }
            setShowModalvariante(false);
            setCurrentVariante(null);
            loadVariantes();
        } catch (error) {
            console.error("Error guardando variante:", error);
        }
    };

    return (
        <div className="">
            <div className="header">
                <h3 className="">Variantes del producto</h3>
                <button className="addButton" onClick={handleAdd}>
                    Nueva Variante
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table minTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Peso</th>
                            <th>Color</th>
                            <th>Talla</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {variantes.map((variante) => (
                            <tr key={variante.varianteId}>
                                <td data-label="Id">{variante.varianteId}</td>
                                <td data-label="Peso">{variante.peso?.valor || '-'}</td>
                                <td  data-label="Color">{variante.color?.valor || '-'}</td>
                                <td  data-label="Talla">{variante.talla?.valor || '-'}</td>
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

            {showModalvariante && (
                <VarianteFormModal
                    showModalvariante={showModalvariante}
                    initialData={currentVariante}
                    productoId={productoId}
                    onSave={handleSave}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default VarianteTable;