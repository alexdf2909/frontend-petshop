import { useState, useEffect } from "react";
import {  deleteCompra, updateCompra, createCompra } from "../../../services/adminApi";
import { fetchCompras } from "../../../services/api";
import CompraFormModal from "./CompraFormModal";
import './styles/tables.css';

const CompraTable = () => {
    const [compras, setCompras] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCompra, setCurrentCompra] = useState(null);

    useEffect(() => {
        loadCompras();
    }, []);

    const loadCompras = async () => {
        try {
            const fetchedCompras = await fetchCompras();
            setCompras(fetchedCompras);
        } catch (error) {
            console.error("Error cargando compras:", error);
        }
    };

    const handleAdd = () => {
        setCurrentCompra(null);
        setShowModal(true);
    };

    const handleEditClick = (compra) => {
        setCurrentCompra(compra);
        setShowModal(true);
    };

    const handleDelete = async (compraId, compraName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el compra ${compraName}? Los compras asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteCompra(compraId);
            setCompras((prev) => prev.filter((compra) => compra.compraId !== compraId));
            loadCompras();
        } catch (error) {
            console.error("Error eliminando compra:", error);
        }
    };

    const handleSave = async (compraData) => {
        try {
            if (currentCompra) {
                const updatedCompra = await updateCompra(currentCompra.compraId, compraData);
                setCompras((prev) =>
                    prev.map((compra) => (compra.compraId === updatedCompra.compraId ? updatedCompra : compra))
                );
            } else {
                const newCompra = await createCompra(compraData);
                setCompras((prev) => [...prev, newCompra]);
            }
            setShowModal(false);
            setCurrentCompra(null);
            loadCompras();
        } catch (error) {
            console.error("Error guardando compra:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Compras</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Compra
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Código</th>
                            <th>Fecha Compra</th>
                            <th>Fecha Registro</th>
                            <th>Empleado</th>
                            <th>Desactivado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map((compra) => (
                            <tr key={compra.compraId}>
                                <td data-label="ID">{compra.compraId}</td>
                                <td data-label="Codigo">{compra.codigoComprobante}</td>
                                <td data-label="FechaCompra">{compra.fechaCompra}</td>
                                <td data-label="FechaRegistro">{compra.fechaRegistro}</td>
                                <td data-label="Empleado">{compra.usuario.nombre}</td>
                                <td data-label="Desactivado">{compra.deleted ? 'Sí' : 'No'}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(compra)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(compra.compraId, compra.nombre)}
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
                <CompraFormModal
                    initialData={currentCompra}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentCompra(null);
                    }}
                />
            )}
        </div>
    );
};

export default CompraTable;