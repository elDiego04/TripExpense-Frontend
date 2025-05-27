import React from "react";
import "./HotelsCards.css";
import { useNavigate } from "react-router-dom";

const hotelsCard = ({ city, img }) => {
    const navigate = useNavigate();

    const handleHotelsViewClick = () => {
        navigate("/hotels-view");
    };
    return (
        <div className="hc-card">
            <img src={img} alt={city} className="hc-image" />
            <div className="hc-content">
                <h3>{city}</h3>
                <p>WIFI • Piscina • Restaurantes</p>
                <button className="hc-button" onClick={handleHotelsViewClick}><strong>Ver hotel</strong></button>
            </div>
        </div>
    );
};

export default hotelsCard;