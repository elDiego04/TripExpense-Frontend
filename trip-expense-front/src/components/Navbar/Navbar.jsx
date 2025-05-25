import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoTripExpense1.jpg";
import {
  FaHotel,
  FaPlane,
  FaMapMarkedAlt,
  FaSuitcaseRolling,
  FaCity,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");

  const leftNavItems = [
    { icon: <FaPlane />, label: "Vuelos", path: "/flights" },
    { icon: <FaHotel />, label: "Hoteles", path: "/hotels" },
    { icon: <FaSuitcaseRolling />, label: "Paquetes", path: "/packages" },
    { icon: <FaMapMarkedAlt />, label: "Actividades", path: "/activities" },
    { icon: <FaCity />, label: "Ciudades", path: "/cities" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-items">
        {leftNavItems.map((item, index) => (
          <div
            key={index}
            className="nav-icon-wrapper"
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span className="nav-tooltip">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="nav-logo" onClick={() => navigate("/")}>
        <img src={Logo} alt="TripExpense Logo" />
      </div>

      <div className="nav-user">
        {isAuthenticated ? (
          <>
            <div className="nav-icon-wrapper" onClick={() => navigate("/profile")}>
              <FaUserCircle />
              <span className="nav-tooltip">Perfil</span>
            </div>
            <div className="nav-icon-wrapper" onClick={handleLogoutClick}>
              <FaSignOutAlt />
              <span className="nav-tooltip">Cerrar Sesión</span>
            </div>
          </>
        ) : (
          <>
            <button className="nav-auth-button" onClick={handleLoginClick}>
              Iniciar Sesión
            </button>
            <button className="nav-auth-button signup" onClick={handleSignupClick}>
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
