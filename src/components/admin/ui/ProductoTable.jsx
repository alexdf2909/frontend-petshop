import { useState, useEffect } from "react";
import { fetchProductos, deleteProducto, updateProducto, createProducto } from "../../../services/adminApi";
import ProductoFormModal from "./ProductoFormModal";
import './styles/tables.css';

const ProductoTable = () => {
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentProducto, setCurrentProducto] = useState(null);

    useEffect(() => {
        loadProductos();
    }, []);

    const loadProductos = async () => {
        try {
            const fetchedProductos = await fetchProductos();
            setProductos(fetchedProductos);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    const handleAdd = () => {
        setCurrentProducto(null);
        setShowModal(true);
    };

    const handleEditClick = (producto) => {
        setCurrentProducto(producto);
        setShowModal(true);
    };

    const handleDelete = async (productoId, productoName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar el producto ${productoName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteProducto(productoId);
            setProductos((prev) => prev.filter((producto) => producto.productoId !== productoId));
            loadProductos();
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    const handleSave = async (productoData) => {
        try {
            if (currentProducto) {
                const updatedProducto = await updateProducto(currentProducto.productoId, productoData);
                setProductos((prev) =>
                    prev.map((producto) => (producto.productoId === updatedProducto.productoId ? updatedProducto : producto))
                );
            } else {
                const newProducto = await createProducto(productoData);
                setProductos((prev) => [...prev, newProducto]);
            }
            setShowModal(false);
            setCurrentProducto(null);
            loadProductos();
        } catch (error) {
            console.error("Error guardando producto:", error);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1 className="title">Gestión de Productos</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Producto
                </button>
            </div>

            <div className="tableWrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Especie</th>
                            <th>Marca</th>
                            <th>Categoría</th>
                            <th>Desactivado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.productoId}>
                                <td data-label="ID">{producto.productoId}</td>
                                <td data-label="Nombre">{producto.nombre}</td>
                                <td data-label="Especie">{producto.especie.nombre}</td>
                                <td data-label="Marca">{producto.marca.nombre}</td>
                                <td data-label="Categoria">{producto.categoria.nombre}</td>
                                <td data-label="Desactivado">{producto.deleted ? 'Sí' : 'No'}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(producto)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(producto.productoId, producto.nombre)}
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
                <ProductoFormModal
                    initialData={currentProducto}
                    onSave={handleSave}
                    onClose={() => {
                    setShowModal(false);
                    setCurrentProducto(null);
                    }}
                />
                )}
        </div>
    );
};

export default ProductoTable;