import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function EditarPerfil() {
  const { nombre, imagenPerfil, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(nombre);
  const [nuevaImagen, setNuevaImagen] = useState(imagenPerfil || "");
  const [tempNombre, setTempNombre] = useState(nombre);
  const [tempImagen, setTempImagen] = useState(imagenPerfil || "");

  const handleEditClick = () => {
    setTempNombre(nuevoNombre);
    setTempImagen(nuevaImagen);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setTempNombre(nuevoNombre);
    setTempImagen(nuevaImagen);
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
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
          nombre: tempNombre,
          imagenPerfil: tempImagen,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualizar datos en el AuthContext
      login(token, refreshToken, res.data); // si tu login acepta usuario actualizado
      setNuevoNombre(tempNombre);
      setNuevaImagen(tempImagen);
      setIsEditing(false);
      alert("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error.response || error);
      alert("Hubo un error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "3rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#333",
          marginBottom: "1.5rem",
          fontWeight: "700",
          fontSize: "3rem",
        }}
      >
        Perfil de Usuario
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid #ddd",
            flexShrink: 0,
          }}
        >
          <img
            src={isEditing ? tempImagen || "/default-avatar.png" : nuevaImagen || "/default-avatar.png"}
            alt="Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {!isEditing && (
            <button
              onClick={handleEditClick}
              aria-label="Editar avatar y nombre"
              title="Editar avatar y nombre"
              style={{
                position: "absolute",
                top: "50%",
                right: "-50px",
                transform: "translateY(-50%)",
                backgroundColor: "var(--primary-color)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                lineHeight: "1",
                boxShadow: "0 0 8px var(--primary-color)",
                animation: "pulse 2s infinite",
                transition: "background-color 0.3s",
                zIndex: 10,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-color)")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
            >
              ✎
            </button>
          )}
        </div>

        <div style={{ flexGrow: 1 }}>
          {!isEditing ? (
            <>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.4rem",
                  color: "#222",
                  fontWeight: "600",
                }}
              >
                {nuevoNombre}
              </h3>
              <button
                onClick={handleEditClick}
                style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 1.5rem",
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "1rem",
                  transition: "background-color 0.3s",
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary-color)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--primary-color)")}
              >
                Editar
              </button>
            </>
          ) : (
            <input
              type="text"
              value={tempNombre}
              onChange={(e) => setTempNombre(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                fontSize: "1.1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          )}
        </div>
      </div>

      {isEditing && (
        <label
          style={{
            display: "block",
            marginBottom: "1rem",
            color: "#555",
            fontWeight: "bold",
          }}
        >
          URL Imagen de Perfil:
          <input
            type="text"
            value={tempImagen}
            onChange={(e) => setTempImagen(e.target.value)}
            placeholder="Ingresa la URL de la imagen"
            style={{
              width: "100%",
              padding: "0.5rem",
              marginTop: "0.3rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </label>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: isEditing ? "space-between" : "center",
          gap: "1rem",
        }}
      >
        {isEditing ? (
          <>
            <button
              onClick={handleCancelClick}
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "#ccc",
                color: "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#bbb")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#ccc")}
            >
              Cancelar
            </button>
            <button
              onClick={handleSaveClick}
              style={{
                flex: 1,
                padding: "0.75rem",
                backgroundColor: "var(--secondary-color)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "var(--primary-color)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "var(--secondary-color)")}
            >
              Guardar
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "var(--primary-color)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background-color 0.3s",
              marginTop: "1rem",
              display: "none", // Hide this button because we have edit icon on avatar
            }}
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
