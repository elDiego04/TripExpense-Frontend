import React from "react";
import "../CitiiesHero/CitiesHero.css";

const CitiesHero = ({ children }) => {
    return (
        <div className="c-hero">
            <div className="c-overlay"></div>
            <div className="c-content">
                <h1 className="c-title">Vuela sin complicaciones, disfruta sin límites</h1>
                <p className="c-text">Encuentra las mejores rutas y precios para tu próximo destino</p>
                </div>
            {children}
        </div>
    );
};

export default CitiesHero;