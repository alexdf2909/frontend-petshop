import React from 'react'
import styles from './styles/Banner.module.css'
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className={styles.banner}>
        
        <div className={styles.bannerContenido}>
            <span>Yoshi Pets</span>
            <h1>La petshop que necesitas</h1>
            <p>¡Todo para tu mascota en un solo lugar! Calidad, amor y cuidado garantizado.</p>
            <Link to="/productos">Comprar</Link>
        </div>
    </div>
  )
}

export default Banner