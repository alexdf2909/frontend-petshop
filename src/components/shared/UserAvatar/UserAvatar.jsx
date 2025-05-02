import React from "react";
import styles from "./UserAvatar.module.css";
import { useAuth } from "../../../context/AuthContext";

export default function UserAvatar() {
  const { nombre, imagenPerfil } = useAuth();

  if (!nombre) return null;

  const imagenValida = typeof imagenPerfil === "string" && imagenPerfil.trim() !== "";

  return (
    <div className={styles.userAvatar}>
      {imagenValida ? (
        <img
          src={imagenPerfil}
          alt={`${nombre}'s avatar`}
          className={styles.avatarImg}
        />
      ) : (
        <img
          src={imagenValida ? imagenPerfil : "/default-avatar.png"}
          alt="Avatar por defecto"
          className={styles.avatarImg}
        />
      )}
      <span className={styles.userName}>{nombre}</span>
    </div>
  );
}
