import { useState, useEffect } from "react";
import { fetchPedidos } from "../../../services/api";

const PedidosTable = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    loadPedidos();
  }, []);

  const loadPedidos = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const fetchedPedidos = await fetchPedidos(token);
      const sortedPedidos = fetchedPedidos.sort((a, b) =>
        new Date(b.fechaRegistro) - new Date(a.fechaRegistro)
      );
      setPedidos(sortedPedidos);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    }
  };

  return (
    <div className="">
      <div className="headerTable">
        <h1 className="title">Gestión de Pedidos</h1>
      </div>

      <div className="tableWrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Usuario</th>
              <th>Fecha Registro</th>
              <th>Monto Total</th>
              <th>Dirección Envío</th>
              <th>Modo Entrega</th>
              <th>Método Pago</th>
              <th>Estado Pedido</th>
              <th>Tiempo Estimado Entrega</th>
              <th>Progreso Entrega</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.pedidoId}>
                <td data-label="ID Pedido">{pedido.pedidoId}</td>
                <td data-label="Usuario">{pedido.usuario ? pedido.usuario.nombre : pedido.usuarioId}</td>
                <td data-label="Fecha Registro">{new Date(pedido.fechaRegistro).toLocaleString()}</td>
                <td data-label="Monto Total">{pedido.montoTotal.toFixed(2)}</td>
                <td data-label="Dirección Envío">{pedido.direccionEnvio || 'N/A'}</td>
                <td data-label="Modo Entrega">{pedido.modoEntrega}</td>
                <td data-label="Método Pago">{pedido.metodoPago}</td>
                <td data-label="Estado Pedido">{pedido.estadoPedido}</td>
                <td data-label="Tiempo Estimado Entrega">{pedido.tiempoEstimadoEntrega || 'N/A'}</td>
                <td data-label="Progreso Entrega">{pedido.progresoEntrega}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PedidosTable;
