import React from 'react'
import { useQuery } from '@tanstack/react-query';
import './styles/ServicioCard.css';

const ServicioCard = ({ servicio }) => {

  return (
    <div className="servicio-card">
        <img src={servicio.imagenDespues} alt={servicio.nombre + " despues"} />
        <div className='servicio-data'>
        <h3>{servicio.nombre}</h3>
        <p className='servicio-horario'>
                Horario: {servicio.horario}
            </p>
        </div>
        
    </div>
  )
}

export default ServicioCard