import { useState, useEffect } from "react";
import { deleteLote, updateLote, createLote } from "../../../services/adminApi";
import { fetchLotes } from "../../../services/api";
import LoteFormModal from "./LoteFormModal";
import './styles/tables.css';

const LoteTable = () => {
    const [lotes, setLotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentLote, setCurrentLote] = useState(null);

    useEffect(() => {
        loadLotes();
    }, []);

    const loadLotes = async () => {
        try {
            const fetchedLotes = await fetchLotes();
            setLotes(fetchedLotes);
        } catch (error) {
            console.error("Error cargando lotes:", error);
        }
    };

    const handleAdd = () => {
        setCurrentLote(null);
        setShowModal(true);
    };

    const handleEditClick = (lote) => {
        setCurrentLote(lote);
        setShowModal(true);
    };

    const handleDelete = async (loteId, loteName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el lote ${loteName}? Los lotes asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteLote(loteId);
            setLotes((prev) => prev.filter((lote) => lote.loteId !== loteId));
            loadLotes();
        } catch (error) {
            console.error("Error eliminando lote:", error);
        }
    };

    const handleSave = async (loteData) => {
        try {
            if (currentLote) {
                const updatedLote = await updateLote(currentLote.loteId, loteData);
                setLotes((prev) =>
                    prev.map((lote) => (lote.loteId === updatedLote.loteId ? updatedLote : lote))
                );
            } else {
                const newLote = await createLote(loteData);
                setLotes((prev) => [...prev, newLote]);
            }
            setShowModal(false);
            setCurrentLote(null);
            loadLotes();
        } catch (error) {
            console.error("Error guardando lote:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Lotes</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Lote
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código Compra</th>
                            <th>Producto</th>
                            <th>Fecha Fabricación</th>
                            <th>Fecha Vencimiento</th>
                            <th>Stock</th>
                            <th>Desactivado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lotes.map((lote) => (
                            <tr key={lote.id}>
                                <td data-label="ID">{lote.loteId}</td>
                                <td data-label="Compra">{lote.compra.codigoComprobante}</td>
                                <td data-label="Producto">
                                {[
                                    lote.variante.producto?.nombre,
                                    lote.variante.talla?.valor,
                                    lote.variante.color?.valor,
                                    lote.variante.peso?.valor
                                ].filter(Boolean).join(' ')}
                                </td>
                                <td data-label="FechaFabricacion">{lote.fechaFabricacion}</td>
                                <td data-label="FechaVencimiento">{lote.fechaVencimiento ?? '-'}</td>
                                <td data-label="Stock">{lote.stock}</td>
                                <td data-label="Desactivado">{lote.deleted ? 'Sí' : 'No'}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(lote)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(lote.loteId, lote.nombre)}
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
                <LoteFormModal
                    initialData={currentLote}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentLote(null);
                    }}
                />
            )}
        </div>
    );
};

export default LoteTable;