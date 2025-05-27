import React from "react";
import "./ActivitiesHero.css";

const ActivitiesHero = ({ children }) => {
    return (
        <div className="a-hero">
            <div className="a-overlay"></div>
            <div className="a-content">
                <h1 className="a-title">Explora nuevas experiencias, vive cada momento</h1>
                <p className="a-text">Descubre y reserva actividades únicas en los mejores destinos</p>
            </div>
            {children}
        </div>
    );
};

export default ActivitiesHero;
