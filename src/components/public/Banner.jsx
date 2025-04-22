import React from 'react'
import styles from './styles/Banner.module.css'
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className={styles.banner}>
        <div className={styles.header}>
            <div className={styles.contacto}>
                <div className={styles.contactoInfo}>
                    <i className="fa-solid fa-phone"></i>
                    <span>+51 987 654 321</span>
                </div>
                <div className={styles.contactoInfo}>
                    <i className="fa-solid fa-envelope"></i>
                    <span>yoshipets@gmail.com</span>
                </div>
            </div>
            <div className={styles.contacto}>
                <div className={styles.contactoInfo}>
                    <i className="fa-solid fa-location-dot"></i>
                    <span>Av. Arica 427 - Comas</span>
                </div>
            </div>
        </div>
        <div className={styles.bannerContenido}>
            <span>Yoshi Pets</span>
            <h1>La petshop que necesitas</h1>
            <p>Reiciendis architecto perspiciatis, nobis fugit sapiente porro mollitia dicta sunt ducimus</p>
            <Link to="/productos">Comprar</Link>
        </div>
    </div>
  )
}

export default Banner