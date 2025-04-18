import { useState, useEffect } from 'react';
import { uploadImagen } from '../../../services/adminApi';
import { useAuth } from '../../../context/AuthContext'; // 👈 nuevo
import './styles/modals.css';

const CompraFormModal = ({ initialData, onSave, onClose }) => {
  const { userId, nombre } = useAuth(); // 👈 nuevo

  const [compra, setCompra] = useState({
    codigoComprobante: '',
    urlImagenComprobante: '',
    fechaCompra: '',
    fechaRegistro: '',
    usuarioId: '',
    deleted: false,
    compraId: null
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCompra({
        codigoComprobante: initialData.codigoComprobante || '',
        urlImagenComprobante: initialData.urlImagenComprobante || '',
        fechaCompra: initialData.fechaCompra || '',
        fechaRegistro: initialData.fechaRegistro || '',
        usuarioId: initialData.usuarioId || '',
        deleted: !!initialData.deleted,
        compraId: initialData.compraId
      });
    } else {
      setCompra(prev => ({
        ...prev,
        usuarioId: userId || '',
        fechaRegistro: new Date().toISOString().split('T')[0], // 👈 fecha actual
      }));
    }
  }, [initialData, userId]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox' && name === 'deleted') {
      setCompra(prev => ({ ...prev, [name]: checked }));
    } else {
      setCompra(prev => ({ ...prev, [name]: value }));
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
        compraId: compra.compraId
      };

      await onSave(formattedCompra);
    } catch (err) {
      console.error('Error al subir imagen o guardar compra', err);
      setSubiendoImagen(false);
    }
  };

  return (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <div className='modalHeader'>
          <h2>{initialData ? 'Editar Compra' : 'Nueva Compra'}</h2>
          <button className='closeButton' onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className='scrollContainer'>
          <form onSubmit={handleSubmit} className='form'>
            <div className='formGroup'>
              <label>
                <span>Código Comprobante</span>
                <input
                  type="text"
                  name="codigoComprobante"
                  value={compra.codigoComprobante}
                  onChange={handleChange}
                  className='input'
                  required
                  disabled={!!initialData}
                />
              </label>
            </div>

            <div className='formGroup'>
              <label>
                <span>Fecha Compra</span>
                <input
                  type="date"
                  name="fechaCompra"
                  value={compra.fechaCompra}
                  onChange={handleChange}
                  className='input'
                  required
                />
              </label>
            </div>

            <div className='formGroup'>
              <label>
                <span>Fecha Registro</span>
                <input
                  type="date"
                  name="fechaRegistro"
                  value={compra.fechaRegistro}
                  className='input'
                  disabled
                />
              </label>
            </div>

            <div className='formGroup'>
              <label>
                <span>Empleado</span>
                <input
                  type="text"
                  name="usuarioId"
                  value={nombre}
                  className='input'
                  disabled
                />
              </label>
            </div>

            <div className="formGroup">
              <label className="customFileLabel">
                <span>Comprobante</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="fileInput"
                />
              </label>

              {(imagenFile || compra.urlImagenComprobante) && (
                <div className="previewContainer">
                  <img
                    src={
                      imagenFile
                        ? URL.createObjectURL(imagenFile)
                        : compra.urlImagenComprobante
                    }
                    alt="Vista previa"
                    className="previewImage"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div className='formGroup'>
              <label className='checkboxLabel'>
                <input
                  type="checkbox"
                  name="deleted"
                  checked={compra.deleted}
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
              <button type="submit" className='submitButton' disabled={subiendoImagen}>
                {subiendoImagen ? 'Subiendo...' : initialData ? 'Guardar Cambios' : 'Crear Compra'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompraFormModal;