import React, { useState, useRef, useEffect } from "react";
import styles from "./UserAvatar.module.css";
import { useAuth } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UserAvatar() {
  const { nombre, imagenPerfil, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  if (!nombre) return null;

  const imagenValida = typeof imagenPerfil === "string" && imagenPerfil.trim() !== "";

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.userAvatarContainer} ref={dropdownRef}>
      <div className={styles.userAvatar} onClick={toggleDropdown}>
        <img
          src={imagenValida ? imagenPerfil : "/default-avatar.png"}
          alt={`${nombre}'s avatar`}
          className={styles.avatarImg}
        />
        <span className={styles.userName}>{nombre}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <Link to="/perfil">Mi Perfil</Link>
          <Link to="/favoritos">Mis Favoritos</Link>
          <Link to="/pedido">Mis Pedidos</Link>
          <Link to="/historial">Historial</Link>
          <Link to="/mascotas">Mis Mascotas</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}