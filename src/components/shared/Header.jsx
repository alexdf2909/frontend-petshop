import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./styles/Header.css";
import logo from "../../assets/yoshipets-logo.png"; 

export default function Header() {
  const { isLoggedIn, logout, role } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="left-nav">
          <div className="logo">
          <Link to="/">
            <img src={logo} alt="PetShop" className="logo-img" />
          </Link>
          </div>

          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/productos">Productos</Link>
            {isLoggedIn && role === 'ADMIN' && <Link to="/dashboard">Dashboard</Link>}
          </nav>
        </div>

        <div className="right-nav">
          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registro</Link>
            </>
          ) : (
            <button onClick={logout} className="logout-btn">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}
