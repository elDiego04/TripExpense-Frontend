import React from "react";
import HotelsCards from "../HotelsCards/HotelsCards.jsx";
import { useNavigate } from "react-router-dom";
import "./HotelsH.css";

const hotels = [
    { city: "Nueva York, USA", img: "../assets/Newyork.jpg" },
    { city: "Londres, Reino Unido", img: "../assets/London.jpg" },
    { city: "Tokio, Japón", img: "../assets/Tokyo.jpg" },
    { city: "Dubái, Emiratos Árabes Unidos", img: "../assets/Dubai.jpg" }
];

const Hotels = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate("/signup");
    };
    return (
        <section className="hotels">
            <div className="hotels-header">
                <h2>Hoteles</h2>
                <p>Tu próxima aventura empieza con el hotel perfecto.</p>
            </div>
            <div className="hotels-cards">
                {hotels.map((destination, index) => (
                    <HotelsCards key={index} {...destination} />
                ))}
            </div>
        </section>
    );
};

export default Hotels;