import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";
import "./CityDetailsPage.css";
import Navbar from "../../components/Navbar/Navbar";

const CityDetailsPage = () => {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await api.get(`/cities/${cityId}`);
        setCity(res.data);
      } catch (err) {
        console.error("Error al obtener la ciudad:", err);
      }
    };

    if (cityId) {
      fetchCity();
    }
  }, [cityId]);

  if (!city) {
    return <div className="city-details-loading">Cargando información de la ciudad...</div>;
  }

  return (
    <div className="city-details-container">
      <Navbar />
      <div className="city-details-card">
        <div className="city-details-left">
          <button className="city-back-button" onClick={() => navigate("/cities")}>
            <FaArrowLeft /> Volver
          </button>
          <div className="city-details-image">
            <img src={city.imageUrl} alt={city.name} />
          </div>
        </div>

        <div className="city-details-info">
          <h2>{city.name}, {city.country}</h2>
          <p><strong>Descripción:</strong> {city.description || "No disponible"}</p>
          <p><strong>Idioma:</strong> {city.language || "No disponible"}</p>
          <p><strong>Moneda:</strong> {city.currency || "No disponible"}</p>
          <p><strong>Clima:</strong> {city.climate || "No disponible"}</p>
          <p><strong>Mejor época para visitar:</strong> {city.bestTimeToVisit || "No disponible"}</p>
        </div>
      </div>
    </div>
  );
};

export default CityDetailsPage;
