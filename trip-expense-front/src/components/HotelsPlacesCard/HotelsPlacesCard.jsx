import React from "react";
import "./HotelsPlacesCard.css";
import { useNavigate } from "react-router-dom";

const PlacesCard = ({ city, img }) => {
    const navigate = useNavigate();

    const handleHotelsOptionsClick = () => {
        navigate("/hotels-options");
    };
    return (
        <div className="pc-card">
            <img src={img} alt={city} className="pc-image" />
            <div className="pc-content">
                <h3>{city}</h3>
                <button className="pc-button" onClick={handleHotelsOptionsClick}><strong>Explorar hoteles</strong></button>
            </div>
        </div>
    );
};

export default PlacesCard;