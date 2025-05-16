import { useState, useEffect } from 'react';
import { uploadImagen, listarLotePorCompra } from '../../../services/adminApi';
import { useAuth } from '../../../context/AuthContext';
import './styles/modals.css';
import LoteFormModal from './LoteFormModal';

const CompraFormModal = ({ initialData, onSave, onClose }) => {
  const { userId, nombre } = useAuth();

  const [compra, setCompra] = useState({
    codigoComprobante: '',
    urlImagenComprobante: '',
    fechaCompra: '',
    fechaRegistro: '',
    usuarioId: '',
    deleted: false,
    compraId: null,
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [lotes, setLotes] = useState([]);

  const [mostrarLoteModal, setMostrarLoteModal] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCompra({
        codigoComprobante: initialData.codigoComprobante || '',
        urlImagenComprobante: initialData.urlImagenComprobante || '',
        fechaCompra: initialData.fechaCompra || '',
        fechaRegistro: initialData.fechaRegistro || '',
        usuarioId: initialData.usuarioId || '',
        deleted: !!initialData.deleted,
        compraId: initialData.compraId,
      });
    } else {
      setCompra((prev) => ({
        ...prev,
        usuarioId: userId || '',
        fechaRegistro: new Date().toISOString().split('T')[0],
      }));
    }
  }, [initialData, userId]);

  useEffect(() => {
    if (!compra.compraId) return;
    const loadLotes = async () => {
      try {
        const lotes = await listarLotePorCompra(compra.compraId);
        setLotes(lotes);
      } catch (error) {
        console.error('Error cargando lotes:', error);
      }
    };
    loadLotes();
  }, [compra.compraId]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox' && name === 'deleted') {
      setCompra((prev) => ({ ...prev, [name]: checked }));
    } else {
      setCompra((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagenFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let urlImagenComprobante = compra.urlImagenComprobante;

    try {
      if (imagenFile) {
        setSubiendoImagen(true);
        const formData = new FormData();
        formData.append('file', imagenFile);
        const url = await uploadImagen(formData);
        urlImagenComprobante = url;
        setSubiendoImagen(false);
      }

      const formattedCompra = {
        codigoComprobante: compra.codigoComprobante,
        urlImagenComprobante,
        fechaCompra: compra.fechaCompra,
        fechaRegistro: compra.fechaRegistro,
        usuarioId: parseInt(compra.usuarioId, 10),
        deleted: compra.deleted,
        compraId: compra.compraId,
        lotes: lotes,
      };

      await onSave(formattedCompra);
    } catch (err) {
      console.error('Error al subir imagen o guardar compra', err);
      setSubiendoImagen(false);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <h2>{initialData ? 'Editar Compra' : 'Nueva Compra'}</h2>
          <button className="closeButton" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="scrollContainer">
          <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
              <label>
                <span>Código Comprobante</span>
                <input
                  type="text"
                  name="codigoComprobante"
                  value={compra.codigoComprobante}
                  onChange={handleChange}
                  className="input"
                  required
                  disabled={!!initialData}
                />
              </label>
            </div>

            <div className="formGroup">
              <label>
                <span>Fecha Compra</span>
                <input
                  type="date"
                  name="fechaCompra"
                  value={compra.fechaCompra}
                  onChange={handleChange}
                  className="input"
                  required
                  disabled={!!initialData}
                />
              </label>
            </div>

            <div className="formGroup">
              <label>
                <span>Fecha Registro</span>
                <input
                  type="date"
                  name="fechaRegistro"
                  value={compra.fechaRegistro}
                  className="input"
                  disabled
                />
              </label>
            </div>

            <div className="formGroup">
              <label>
                <span>Empleado</span>
                <input type="text" name="usuarioId" value={nombre} className="input" disabled />
              </label>
            </div>

            <div className="formGroup">
              <label className="customFileLabel">
                <span>Comprobante</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="fileInput" />
              </label>

              {(imagenFile || compra.urlImagenComprobante) && (
                <div className="previewContainer">
                  <img
                    src={imagenFile ? URL.createObjectURL(imagenFile) : compra.urlImagenComprobante}
                    alt="Vista previa"
                    className="previewImage"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div className="formGroup">
              <label>
                <div className="inputWithButton">
                <span>Lotes</span>
                <button
                    type="button"
                    onClick={() => setMostrarLoteModal(true)}
                    className="miniButton"
                    disabled={!!initialData} // deshabilitar si hay initialData (modo edición)
                    style={{ cursor: initialData ? 'not-allowed' : 'pointer', opacity: initialData ? 0.5 : 1 }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                
                  
                </div>
              </label>

              {lotes.length > 0 && (
                <table className="tableModal">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Fecha Fab.</th>
                      <th>Fecha Ven.</th>
                      <th>Stock</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotes.map((lote, idx) => (
                      <tr key={idx}>
                        <td>{lote.variante? `${lote.variante.producto.nombre|| ''} ${lote.variante.color?.valor || ''} ${lote.variante.talla?.valor || ''} ${lote.variante.peso?.valor || ''}`.trim() || '-' : `${lote.productoNombre} ${lote.varianteNombre}`.trim() || '-'}</td>
                        <td>{lote.fechaFabricacion}</td>
                        <td>{lote.fechaVencimiento}</td>
                        <td>{lote.stock}</td>
                        <td>
                          {!initialData && (
                          <button
                            type="button"
                            className={`actionButton delete`}
                            onClick={() => {
                              const nuevosLotes = [...lotes];
                              nuevosLotes.splice(idx, 1);
                              setLotes(nuevosLotes);
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="formGroup">
              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  name="deleted"
                  checked={compra.deleted}
                  onChange={handleChange}
                  className="checkboxInput"
                />
                <span>Desactivar</span>
              </label>
            </div>

            <div className="formActions">
              <button type="button" className="cancelButton" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="submitButton" disabled={subiendoImagen}>
                {subiendoImagen ? 'Subiendo...' : initialData ? 'Guardar Cambios' : 'Crear Compra'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {mostrarLoteModal && (
        <LoteFormModal
          onSave={(nuevoLote) => {
            setLotes((prev) => [...prev, nuevoLote]);
            setMostrarLoteModal(false);
          }}
          onClose={() => setMostrarLoteModal(false)}
        />
      )}
    </div>
  );
};

export default CompraFormModal;
