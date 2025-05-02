import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function EditarPerfil() {
  const { nombre, imagenPerfil, login } = useAuth();
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevaImagen, setNuevaImagen] = useState(imagenPerfil || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token) {
      alert("No estás autenticado. Por favor inicia sesión.");
      return;
    }

    try {
      const res = await axios.put(
        "http://localhost:8080/usuario/perfil",
        {
          nombre: nuevoNombre,
          imagenPerfil: nuevaImagen,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar datos en el AuthContext
      login(token, refreshToken, res.data); // si tu login acepta usuario actualizado
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error.response || error);
      alert("Hubo un error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ 
      maxWidth: "500px", 
      margin: "2rem auto", 
      padding: "2rem", 
      backgroundColor: "#f9f9f9", 
      borderRadius: "12px", 
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" 
    }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "1rem" }}>Editar Perfil</h2>
      <form 
        onSubmit={handleSubmit} 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "1rem" 
        }}
      >
        <label style={{ color: "#555", fontWeight: "bold" }}>
          Nombre:
          <input 
            value={nuevoNombre} 
            onChange={(e) => setNuevoNombre(e.target.value)} 
            style={{ 
              width: "100%", 
              padding: "0.5rem", 
              marginTop: "0.3rem", 
              border: "1px solid #ccc", 
              borderRadius: "8px" 
            }} 
          />
        </label>
  
        <label style={{ color: "#555", fontWeight: "bold" }}>
          URL Imagen de Perfil:
          <input 
            value={nuevaImagen} 
            onChange={(e) => setNuevaImagen(e.target.value)} 
            style={{ 
              width: "100%", 
              padding: "0.5rem", 
              marginTop: "0.3rem", 
              border: "1px solid #ccc", 
              borderRadius: "8px" 
            }} 
          />
        </label>
  
        <div style={{ textAlign: "center" }}>
          <img 
            src={nuevaImagen || "/default-avatar.png"} 
            alt="Vista previa" 
            style={{ 
              width: "100px", 
              height: "100px", 
              objectFit: "cover", 
              borderRadius: "50%", 
              border: "2px solid #ddd" 
            }} 
          />
        </div>
  
        <button 
          type="submit" 
          style={{ 
            padding: "0.75rem", 
            backgroundColor: "#4CAF50", 
            color: "#fff", 
            border: "none", 
            borderRadius: "8px", 
            cursor: "pointer", 
            fontWeight: "bold", 
            transition: "background-color 0.3s" 
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#45A049"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );  
}
