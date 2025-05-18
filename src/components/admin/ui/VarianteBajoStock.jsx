import React, { useEffect, useState } from 'react';
import { fetchVariantesBajoStock } from '../../../services/api'; // Ajusta si es necesario
import './styles/tables.css';

const VarianteBajoStock = () => {
  const [variantes, setVariantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarVariantes = async () => {
      try {
        const data = await fetchVariantesBajoStock();
        setVariantes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarVariantes();
  }, []);

  return (
    <div>
      <div className="">
        <h2 className="title">Productos con stock bajo</h2>
      </div>

      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Notificación */}
      {!loading && variantes.length > 0 && (
        <div className="alertaStockCritico">
          ⚠ Atención: hay {variantes.length} producto(s) con stock crítico.
        </div>
      )}

      {!loading && !error && (
        <div className="tableWrapper">
          {variantes.length === 0 ? (
            <p>No hay productos con stock bajo.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Stock útil</th>
                  <th>Stock vencido</th>
                  <th>Stock mínimo</th>
                  <th>¿Sin lotes?</th>
                </tr>
              </thead>
              <tbody>
                {variantes.map((v) => {
                    const isCritico = v.stockUtil < v.stockMinimo || v.sinLotes;

                    return (
                    <tr key={v.varianteId}>
                        <td>{v.nombreProducto}</td>
                        <td className={isCritico ? 'stock-critico-cell' : ''}>
                        {v.stockUtil}
                        </td>
                        <td>{v.stockVencido}</td>
                        <td>{v.stockMinimo}</td>
                        <td>{v.sinLotes ? 'Sí' : 'No'}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default VarianteBajoStock;
