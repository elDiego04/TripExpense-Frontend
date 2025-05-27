import React from "react";
import PlacesCard from "../HotelsPlacesCard/HotelsPlacesCard";
import "./HotelsPlaces.css";

const places = [
    { city: "Estambul, Turquía", img: "../assets/Estambul.jpg" },
    { city: "Sídney, Australia", img: "../assets/Sidney.jpg" },
    { city: "Bakú, Azerbaiyán", img: "../assets/Baku.jpg" },
    { city: "Malé, Maldivas", img: "../assets/Maldives.jpg" }
];

const HotelsPlaces = () => {
    return (
        <section className="places">
            <div className="places-header">
                <h2>Ciudades que inspiran viajes</h2>
                <p>¿Viajas esta temporada? Te ayudamos a encontrar a tu próximo destino.</p>
            </div>
            <div className="places-cards">
                {places.map((destination, index) => (
                    <PlacesCard key={index} {...destination} />
                ))}
            </div>
        </section>
    );
};

export default HotelsPlaces;