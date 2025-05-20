import { useState, useEffect } from 'react';
import { fetchCompras, fetchProductos, fetchVariantes } from '../../../services/api';
import './styles/modals.css';

const LoteFormModal = ({ initialData, onSave, onClose }) => {
    const [lote, setLote] = useState({
        compraId: '',
        varianteId: '',
        fechaVencimiento: '',
        fechaFabricacion: '',
        stock: '',
        deleted: false,
        loteId: null
    });

    const [productoId, setProductoId] = useState('');
    const [compras, setCompras] = useState([]);
    const [productos, setProductos] = useState([]);
    const [variantes, setVariantes] = useState([]);

    useEffect(() => {
        if (initialData) {
            setLote({
                compraId: initialData.compra.compraId || '',
                varianteId: initialData.variante.varianteId || '',
                fechaVencimiento: initialData.fechaVencimiento || '',
                fechaFabricacion: initialData.fechaFabricacion || '',
                stock: initialData.stock || '',
                deleted: !!initialData.deleted,
                loteId: initialData.loteId
            });
            setProductoId(initialData.variante.producto.productoId.toString());
        }
    }, [initialData]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [comRes, proRes, varRes] = await Promise.all([
                    fetchCompras(),
                    fetchProductos(),
                    fetchVariantes()
                ]);
                setCompras(comRes);
                setProductos(proRes);
                setVariantes(varRes);
            } catch (error) {
                console.error('Error cargando datos para el formulario:', error);
            }
        };
        loadData();
    }, []);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (type === 'checkbox' && name === 'deleted') {
            setLote(prev => ({ ...prev, [name]: checked }));
        } else {
            setLote(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleProductoChange = (e) => {
        const value = e.target.value;
        setProductoId(value);
        setLote(prev => ({ ...prev, varianteId: '' })); // Limpiar variante
    };

    const handleVarianteChange = (e) => {
        const value = e.target.value;
        const varianteSeleccionada = variantes.find(v => v.varianteId === parseInt(value));
        if (varianteSeleccionada) {
            setProductoId(varianteSeleccionada.producto.productoId.toString());
        }
        setLote(prev => ({ ...prev, varianteId: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const producto = productos.find(p => p.productoId === parseInt(productoId));
        const variante = variantes.find(v => v.varianteId === parseInt(lote.varianteId));

        const formattedLote = {
            compraId: parseInt(lote.compraId, 10),
            varianteId: parseInt(lote.varianteId, 10),
            fechaVencimiento: lote.fechaVencimiento,
            fechaFabricacion: lote.fechaFabricacion,
            stock: parseInt(lote.stock, 10),
            deleted: lote.deleted,
            loteId: lote.loteId,
            productoNombre: producto?.nombre || '',
            varianteNombre: `${variante?.color?.valor || ''} ${variante?.talla?.valor || ''} ${variante?.peso?.valor || ''}`.trim()
        };

        await onSave(formattedLote);
    } catch (err) {
        console.error('Error al guardar lote', err);
    }
    };

    const variantesFiltradas = productoId
        ? variantes.filter(v => v.producto.productoId === parseInt(productoId))
        : variantes;

    return (
        <div className='modalOverlay'>
            <div className='modalContent'>
                <div className='modalHeader'>
                    <h2>{initialData ? 'Editar Lote' : 'Nuevo Lote'}</h2>
                    <button className='closeButton' onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className='scrollContainer'>
                    <form onSubmit={handleSubmit} className='form'>

                        <div className='formGroup'>
                            <label>
                                <span>Compra</span>
                                <select
                                    name="compraId"
                                    value={lote.compraId}
                                    onChange={handleChange}
                                    className='input'

                                >
                                    <option value="">Selecciona una Compra</option>
                                    {compras.map(c => (
                                        <option key={c.compraId} value={c.compraId}>{c.codigoComprobante}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Producto</span>
                                <select
                                    name="productoId"
                                    value={productoId}
                                    onChange={handleProductoChange}
                                    className='input'
                                    required
                                    disabled={!!initialData}
                                >
                                    <option value="">Selecciona un Producto</option>
                                    {productos.map(e => (
                                        <option key={e.productoId} value={e.productoId}>{e.nombre}</option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Variante</span>
                                <select
                                    name="varianteId"
                                    value={lote.varianteId}
                                    onChange={handleVarianteChange}
                                    className='input'
                                    required
                                    disabled={!!initialData}
                                >
                                    <option value="">Selecciona una Variante</option>
                                    {variantesFiltradas.map(m => (
                                        <option key={m.varianteId} value={m.varianteId}>
                                            {`${m.color?.valor || ''} ${m.talla?.valor || ''} ${m.peso?.valor || ''}`}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Fecha Fabricación</span>
                                <input
                                    type="date"
                                    name="fechaFabricacion"
                                    value={lote.fechaFabricacion}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Fecha Vencimiento</span>
                                <input
                                    type="date"
                                    name="fechaVencimiento"
                                    value={lote.fechaVencimiento}
                                    onChange={handleChange}
                                    className='input'
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label>
                                <span>Stock</span>
                                <input
                                    type="number"
                                    name="stock"
                                    value={lote.stock}
                                    onChange={handleChange}
                                    className='input'
                                    required
                                    min={0}
                                    disabled={!!initialData}
                                />
                            </label>
                        </div>

                        <div className='formGroup'>
                            <label className='checkboxLabel'>
                                <input
                                    type="checkbox"
                                    name="deleted"
                                    checked={lote.deleted}
                                    onChange={handleChange}
                                    className='checkboxInput'
                                />
                                <span>Desactivar</span>
                            </label>
                        </div>

                        <div className='formActions'>
                            <button type="button" className='cancelButton' onClick={onClose}>
                                Cancelar
                            </button>
                            <button type="submit" className='submitButton'>
                                {initialData ? 'Guardar Cambios' : 'Crear Lote'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoteFormModal;