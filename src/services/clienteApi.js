// services/clienteApi.js

const API_URL = 'http://localhost:8080'; // Cambia esto si usas otra URL

export async function generarPreferencia(carrito) {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${API_URL}/pago/preferencia`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(carrito),
  });

  if (!response.ok) {
    throw new Error('Error al generar la preferencia de pago');
  }

  const data = await response.text();

  return data;  // El ID de la preferencia
}

