import React from "react";
import "../CitiesCard/CitiesCard.css";
import { useNavigate } from "react-router-dom";

const CitiesCard = ({ cityId, name, country, imageUrl }) => {
  const navigate = useNavigate();

  const handleExploreCityClick = () => {
    navigate(`/cities/${cityId}`);
  };

  return (
    <div className="cp-card">
      <img src={imageUrl || "../../../assets/Sidney.jpg"} alt={name} className="cp-image" />
      <div className="cp-content">
        <h3>{name}, {country}</h3>
        <button className="cp-button" onClick={handleExploreCityClick}>
          <strong>Explorar ciudad</strong>
        </button>
      </div>
    </div>
  );
};

export default CitiesCard;
