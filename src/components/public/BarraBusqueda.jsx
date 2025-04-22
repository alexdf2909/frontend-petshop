import React from 'react'
import styles from './styles/BarraBusqueda.module.css'

const BarraBusqueda = () => {
  return (
    <div className={styles.barra}>
        <input
            type="text"
            placeholder="Buscar productos..."
            className={styles.input}
        />
        <button className={styles.btnBuscar}>
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
  )
}

export default BarraBusqueda