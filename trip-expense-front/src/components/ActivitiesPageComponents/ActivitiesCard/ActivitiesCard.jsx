import React from "react";
import { useNavigate } from "react-router-dom";
import "./ActivitiesCard.css";

const ActivitiesCard = ({ activityId, name, imageUrl, cityName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activities/${activityId}`);
  };

  return (
    <div className="ap-card">
      <img src={imageUrl} alt={name} className="ap-card-img" />
      <div className="ap-card-body">
        <h3 className="ap-card-title">{name}</h3>
        <p className="ap-card-city"><strong>{cityName}</strong></p>
        <button onClick={handleClick} className="ap-card-button">
          Ver más
        </button>
      </div>
    </div>
  );
};

export default ActivitiesCard;
