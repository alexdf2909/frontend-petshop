import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles/Header.module.css";
import logo from "../../assets/yoshipets-logo.png";
import { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar/UserAvatar";

export default function Header() {
  const { isLoggedIn, logout, role } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && window.innerWidth > 768) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="PetShop" className={styles.logoImg} />
          </Link>
        </div>

        <UserAvatar />

        {/* Botón Hamburguesa */}
        <button className={styles.burger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className="fa-solid fa-bars"></i>
        </button>

        {/* Contenido que cambia según tamaño */}
        <div className={`${styles.rightNav} ${isMenuOpen ? styles.showMenu : ""}`}>
          {/* Navegación */}
          <nav className={styles.mainNav}>
            <Link to="/">Home</Link>
            <Link to="/productos">Productos</Link>
            {isLoggedIn && role === "ADMIN" && <Link to="/dashboard">Dashboard</Link>}
          </nav>
          
          {/* Accesos según login */}
          {!isLoggedIn ? (
            <div className={styles.auth}>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registro</Link>
            </div>
          ) : (
            <div className={styles.accesosUsuario}>
              <i className="fa-solid fa-heart"></i>
              <i className="fa-solid fa-cart-shopping"></i>
              <button onClick={logout} className={styles.logoutBtn}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
