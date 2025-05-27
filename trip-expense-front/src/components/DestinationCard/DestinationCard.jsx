import React from "react";
import "./DestinationCard.css";
import { useNavigate } from "react-router-dom"; 

const DestinationCard = ({city, img}) => {
    const navigate = useNavigate(); 
  
    return (
        <div className="destination-card" >
            <img src={img} alt={city} className="destination-card__image"/>
            <div className="destination-card__content">
                <h3>{city}</h3>
                <p>Vuelos • Hoteles • Resorts</p>
            </div>
        </div>
    );
};

export default DestinationCard;