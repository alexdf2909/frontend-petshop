import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getMisMascotas } from "../../services/adminApi";
import MascotaCard from "../../components/Mascotas/MascotaCard";
import MascotaFormModal from "../../components/Mascotas/MascotaFormModal";
import styles from "./styles/MisMascotas.module.css"; 

export default function MisMascotas() {
  const { token } = useAuth();
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchMascotas = async () => {
    try {
      const data = await getMisMascotas(token);
      setMascotas(data);
    } catch (err) {
      console.error("Error al obtener mascotas", err);
    }
  };

  useEffect(() => {
    fetchMascotas();
  }, []);

  const handleAddClick = () => {
    setSelectedMascota(null); // Modo agregar
    setShowModal(true);
  };

  const handleEditClick = (mascota) => {
    setSelectedMascota(mascota); // Modo editar
    setShowModal(true);
  };

  const handleSave = () => {
    setShowModal(false);
    fetchMascotas();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Mis Mascotas</h2>
        <button onClick={handleAddClick} className={styles.addButton}>
          + Agregar Mascota
        </button>
      </div>

      <div className={styles.cardsGrid}>
        {mascotas.map((mascota) => (
          <MascotaCard
            key={mascota.mascotaId}
            mascota={mascota}
            onEdit={handleEditClick}
          />
        ))}
      </div>

      {showModal && (
        <MascotaFormModal
          mascota={selectedMascota}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
