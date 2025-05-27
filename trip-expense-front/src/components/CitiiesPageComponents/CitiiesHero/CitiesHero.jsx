import React from "react";
import "../CitiiesHero/CitiesHero.css";

const CitiesHero = ({ children }) => {
    return (
        <div className="c-hero">
            <div className="c-overlay"></div>
            <div className="c-content">
                <h1 className="c-title">Descubre ciudades fascinantes en todo el mundo</h1>
                <p className="c-text">Explora destinos únicos, conoce sus encantos y planifica tu próxima aventura urbana</p>
            </div>
            {children}
        </div>
    );
};

export default CitiesHero;
