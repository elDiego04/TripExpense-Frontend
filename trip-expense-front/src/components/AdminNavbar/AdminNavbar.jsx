import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";
import logo from "../../assets/LogoTripExpense1.jpg";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ isAdmin = false }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("user");

  const handleLoginClick = () => navigate("/login");
  const handleSignupClick = () => navigate("/signup");
  const handleLogoutClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={`adminavabar-navbar ${isAdmin ? "adminavabar-admin-navbar" : ""}`}>
      <div className="adminavabar-navbar__logo" onClick={() => navigate("/")}>
        <img src={logo} alt="TripExpense Logo" />
      </div>
      <div className="adminavabar-nav__buttons">
        {isAuthenticated && isAdmin ? (
          <button className="adminavabar-nav__logout__button" onClick={handleLogoutClick}>
           <FaSignOutAlt size={30} />
          </button>
        ) : !isAuthenticated ? (
          <>
            <button className="adminavabar-nav__login__button" onClick={handleLoginClick}>
              Iniciar Sesión
            </button>
            <button className="adminavabar-nav__signup__button" onClick={handleSignupClick}>
              Registrarse
            </button>
          </>
        ) : (
          <button className="adminavabar-nav__logout__button" onClick={handleLogoutClick}>
            <LuLogOut size={30} />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
