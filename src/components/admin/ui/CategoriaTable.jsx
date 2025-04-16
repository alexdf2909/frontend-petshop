import { useState, useEffect } from "react";
import { fetchCategorias, deleteCategoria, updateCategoria, createCategoria } from "../../../services/adminApi";
import CategoriaFormModal from "./CategoriaFormModal";
import './styles/tables.css';

const CategoriaTable = () => {
    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategoria, setCurrentCategoria] = useState(null);

    useEffect(() => {
        loadCategorias();
    }, []);

    const loadCategorias = async () => {
        try {
            const fetchedCategorias = await fetchCategorias();
            setCategorias(fetchedCategorias);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    const handleAdd = () => {
        setCurrentCategoria(null);
        setShowModal(true);
    };

    const handleEditClick = (categoria) => {
        setCurrentCategoria(categoria);
        setShowModal(true);
    };

    const handleDelete = async (categoriaId, categoriaName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la categoría ${categoriaName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteCategoria(categoriaId);
            setCategorias((prev) => prev.filter((categoria) => categoria.categoriaId !== categoriaId));
            loadCategorias();
        } catch (error) {
            console.error("Error eliminando categoría:", error);
        }
    };

    const handleSave = async (categoriaData) => {
        try {
            if (currentCategoria) {
                const updatedCategoria = await updateCategoria(currentCategoria.categoriaId, categoriaData);
                setCategorias((prev) =>
                    prev.map((categoria) => (categoria.categoriaId === updatedCategoria.categoriaId ? updatedCategoria : categoria))
                );
            } else {
                const newCategoria = await createCategoria(categoriaData);
                setCategorias((prev) => [...prev, newCategoria]);
            }
            setShowModal(false);
            setCurrentCategoria(null);
            loadCategorias();
        } catch (error) {
            console.error("Error guardando categoría:", error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Gestión de Categorías</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nueva Categoría
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
                        {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td data-label="ID">{categoria.categoriaId}</td>
                                <td data-label="Nombre">{categoria.nombre}</td>
                                <td data-label="URL">{categoria.imagenUrl}</td>
                                <td data-label="Imagen">
                                    {categoria.imagenUrl && (
                                        <img 
                                            src={categoria.imagenUrl} 
                                            alt={`Imagen de ${categoria.nombre}`} 
                                            className="iconImage"
                                            onError={(e) => e.target.style.display = 'none'}
                                        />
                                    )}
                                </td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(categoria)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(categoria.categoriaId, categoria.nombre)}
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
                <CategoriaFormModal
                    initialData={currentCategoria}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentCategoria(null);
                    }}
                />
            )}
        </div>
    );
};

export default CategoriaTable;