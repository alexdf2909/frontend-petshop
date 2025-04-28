import React from "react";
import styles from "./UserAvatar.module.css";

export default function UserAvatar({ name, avatar }) {
  return (
    <div className={styles.userAvatar}>
      <img src={avatar} alt={`${name}'s avatar`} className={styles.avatarImg} />
      <span className={styles.userName}>{name}</span>
    </div>
  );
}