import React from "react";
import styles from "./styles/MascotaCard.module.css";

export default function MascotaCard({ mascota, onEdit }) {
  return (
    <div className={styles.card}>
      <img src={mascota.imagenUrl} alt={mascota.nombre} className={styles.image} />
      <h3>{mascota.nombre}</h3>
      <p><strong>Especie:</strong> {mascota.especie.nombre}</p>
      <p><strong>Raza:</strong> {mascota.raza?.nombre || "No especificada"}</p>
      <p><strong>Sexo:</strong> {mascota.sexo}</p>
      <p><strong>Peso:</strong> {mascota.peso} kg</p>
      <button onClick={() => onEdit(mascota)} className={styles.editBtn}>Editar</button>
    </div>
  );
}