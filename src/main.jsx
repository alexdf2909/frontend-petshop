import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import App from './App.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1. Crear el cliente de React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolver tu app con QueryClientProvider y BrowserRouter */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> {/* Agregar BrowserRouter aquí */}
        <App />
        <ToastContainer />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
