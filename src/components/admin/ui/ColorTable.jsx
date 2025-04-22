import { useState, useEffect } from "react";
import { deleteColor, updateColor, createColor } from "../../../services/adminApi";
import { fetchColors} from "../../../services/api";
import ColorFormModal from "./ColorFormModal";
import './styles/tables.css';

const ColorTable = () => {
    const [colors, setColors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentColor, setCurrentColor] = useState(null);

    useEffect(() => {
        loadColors();
    }, []);

    const loadColors = async () => {
        try {
            const fetchedColors = await fetchColors();
            setColors(fetchedColors);
        } catch (error) {
            console.error("Error cargando colores:", error);
        }
    };

    const handleAdd = () => {
        setCurrentColor(null);
        setShowModal(true);
    };

    const handleEditClick = (color) => {
        setCurrentColor(color);
        setShowModal(true);
    };

    const handleDelete = async (colorId, colorName) => {
        const confirmDelete = window.confirm(`¿Estás seguro de eliminar la color ${colorName}? Los productos asociados a ella serán desactivados`);
        if (!confirmDelete) return;
        try {
            await deleteColor(colorId);
            setColors((prev) => prev.filter((color) => color.colorId !== colorId));
            loadColors();
        } catch (error) {
            console.error("Error eliminando color:", error);
        }
    };

    const handleSave = async (colorData) => {
        try {
            if (currentColor) {
                const updatedColor = await updateColor(currentColor.colorId, colorData);
                setColors((prev) =>
                    prev.map((color) => (color.colorId === updatedColor.colorId ? updatedColor : color))
                );
            } else {
                const newColor = await createColor(colorData);
                setColors((prev) => [...prev, newColor]);
            }
            setShowModal(false);
            setCurrentColor(null);
            loadColors();
        } catch (error) {
            console.error("Error guardando color:", error);
        }
    };

    return (
        <div className="">
            <div className="headerTable">
                <h1 className="title">Gestión de Colores</h1>
                <button className="addButton" onClick={handleAdd}>
                    Nuevo Color
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
                        {colors.map((color) => (
                            <tr key={color.colorId}>
                                <td data-label="ID">{color.colorId}</td>
                                <td data-label="Valor">{color.valor}</td>
                                <td data-label="Acciones" className="actions">
                                    <button
                                        className="actionButton"
                                        onClick={() => handleEditClick(color)}
                                        aria-label="Editar"
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button
                                        className={`actionButton delete`}
                                        onClick={() => handleDelete(color.colorId, color.nombre)}
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
                <ColorFormModal
                    initialData={currentColor}
                    onSave={handleSave}
                    onClose={() => {
                        setShowModal(false);
                        setCurrentColor(null);
                    }}
                />
            )}
        </div>
    );
};

export default ColorTable;