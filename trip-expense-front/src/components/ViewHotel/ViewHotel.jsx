import React from 'react';
import './ViewHotel.css';
import ImgH from '../../assets/ImgHotel6.jpg';
import { useNavigate } from "react-router-dom";

const ViewHotel = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => navigate("/login");

    return (
        <section className="hotel-section">
            <img src={ImgH} className="hotel-image" />
            <div className="hotel-stars">{"★".repeat(3)}</div>
            <h2 className="hotel-title">Aden City Hotel</h2>
            <p>📍 Hotel en Baku, Azerbaiyán</p>
            <p className="hotel-description">
                Ofrece una terraza con vista a la ciudad y tiene habitaciones con aire acondicionado, wifi gratis y baño privado. Hay un restaurante de cocina turca y parking privado gratis.
            </p>
            <div className="hotel-old-price">${(50 * 1.3).toFixed(0)} USD</div>
            <div className="hotel-price">$50 USD</div>
            <button className="reserve-button" onClick={handleLoginClick}>Reservar ahora</button>
        </section>
    );
};

export default ViewHotel;