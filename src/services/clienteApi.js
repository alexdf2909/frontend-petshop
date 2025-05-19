// src/services/clienteApi.js

const API_URL = 'http://localhost:8080';

function getToken() {
  return localStorage.getItem('accessToken');
}

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };
}

export async function generarPreferencia(carrito) {
  const res = await fetch(`${API_URL}/pago/preferencia`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(carrito),
  });

  if (!res.ok) throw new Error('Error al generar preferencia');

  return await res.text();
}

export async function completarPago(dto) {
  const res = await fetch(`${API_URL}/pago/completar`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error(await res.text());

  return await res.text();
}
