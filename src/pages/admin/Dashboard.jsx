import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/admin/ui/NavbarAdmin";
import styles from "./styles/dashboard.module.css";

export default function Dashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Escucha cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      // Si paso a desktop, cierro el sidebar (o lo podés dejar abierto si querés)
      if (!mobile) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.adminLayout}>
      {isMobile && !sidebarVisible && (
        <button
          className={styles.toggleButton}
          onClick={() => setSidebarVisible(true)}
          aria-label="Toggle Sidebar"
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      )}

      <NavbarAdmin
        visible={isMobile ? sidebarVisible : true}
        onClose={() => setSidebarVisible(false)}
      />

      <div className={styles.adminContent}>
        <Outlet />
      </div>
    </div>
  );
}
