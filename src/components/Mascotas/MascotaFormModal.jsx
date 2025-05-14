import React, { useEffect, useState } from "react";
import styles from "./styles/MascotaFormModal.module.css";
import { useAuth } from "../../context/AuthContext";
import { createMascota, updateMascota } from "../../services/adminApi";
import { fetchEspecies, fetchRazasByEspecie } from "../../services/api";

export default function MascotaFormModal({ mascota, onClose, onSave }) {
  const { token, userId } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    fechaNacimiento: "",
    especieId: "",
    razaId: "",
    sexo: "MACHO",
    imagenUrl: "",
    peso: "",
    mascotaId:null
  });

  const [especies, setEspecies] = useState([]);
  const [razas, setRazas] = useState([]);

  useEffect(() => {
    if (mascota) {
      setFormData({
        nombre: mascota.nombre || "",
        fechaNacimiento: mascota.fechaNacimiento || "",
        especieId: mascota.especie?.especieId || "",
        razaId: mascota.raza?.razaId || "",
        sexo: mascota.sexo || "MACHO",
        imagenUrl: mascota.imagenUrl || "",
        peso: mascota.peso || "",
        mascotaId: mascota.mascotaId || null
      });
    }
  }, [mascota]);

  useEffect(() => {
    const loadEspecies = async () => {
      try {
        const data = await fetchEspecies(); 
        setEspecies(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadEspecies();
  }, []);
  
  useEffect(() => {
    const loadRazas = async () => {
      if (!formData.especieId) return;
      console.log("Especie seleccionada:", formData.especieId);  // Verifica el ID de la especie
  
      try {
        const data = await fetchRazasByEspecie(formData.especieId, token);
        console.log("Razas obtenidas:", data);  // Verifica las razas que se están obteniendo
        setRazas(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRazas();
  }, [formData.especieId, token]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,

      ...(name === "especieId" && { razaId: "" }) // resetea raza si cambia especie
    }));
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const body = {
      nombre: formData.nombre,
      fechaNacimiento: formData.fechaNacimiento,
      sexo: formData.sexo,
      imagenUrl: formData.imagenUrl,
      peso: parseFloat(formData.peso),
      especieId: parseInt(formData.especieId),
      razaId: formData.razaId ? parseInt(formData.razaId) : null,
      usuarioId: userId
    };
  
    try {
      if (mascota) {
        await updateMascota(mascota.mascotaId, body, token);
      } else {
        await createMascota(body, token);
      }
      onSave();
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al guardar la mascota.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>{mascota ? "Editar Mascota" : "Agregar Mascota"}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
          
          <select name="especieId" value={formData.especieId} onChange={handleChange} required>
            <option value="">Selecciona especie</option>
            {especies.map((esp) => (
              <option key={esp.especieId} value={esp.especieId}>{esp.nombre}</option>
            ))}
          </select>

          <select name="razaId" value={formData.razaId} onChange={handleChange}>
            <option value="">Selecciona raza</option>
            {razas.map((raza) => (
              <option key={raza.razaId} value={raza.razaId}>
                {raza.nombre}
              </option>
            ))}
          </select>

          <select name="sexo" value={formData.sexo} onChange={handleChange} required>
            <option value="MACHO">Macho</option>
            <option value="HEMBRA">Hembra</option>
          </select>

          <input name="imagenUrl" value={formData.imagenUrl} onChange={handleChange} placeholder="URL de imagen" required />
          <input name="peso" type="number" value={formData.peso} onChange={handleChange} placeholder="Peso en kg" required />

          <div className={styles.actions}>
            <button type="submit">{mascota ? "Guardar cambios" : "Agregar"}</button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
