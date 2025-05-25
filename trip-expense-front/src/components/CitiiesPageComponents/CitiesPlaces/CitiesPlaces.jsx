import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CitiesCard from "../CitiesCard/CitiesCard";
import api from "../../../services/api";
import "../CitiesPlaces/CitiesPlaces.css";

const CitiesPlaces = ({ searchTerm }) => {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("/cities");
        setCities(res.data);
        setFilteredCities(res.data);
      } catch (err) {
        console.error("Error al obtener ciudades:", err);
        setCities([]);
        setFilteredCities([]);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCities(cities);
      setNotFound(false);
      return;
    }

    const results = cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length > 0) {
      setFilteredCities(results);
      setNotFound(false);
    } else {
      setFilteredCities([]);
      setNotFound(true);
    }
  }, [searchTerm, cities]);

  return (
    <section className="cities">
      <div className="cities-header">
          <h2>Ciudades que inspiran viajes</h2>
          <p>¿Viajas esta temporada? Te ayudamos a encontrar tu próximo destino.</p>
      </div>

      <div className="cities-cards">
        {notFound ? (
          <p style={{ textAlign: "center", width: "100%", color: "white", fontFamily: "'Montserrat', sans-serif" }}>
            No se encontró ninguna ciudad con ese nombre
          </p>
        ) : filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <CitiesCard
              key={city.cityId}
              cityId={city.cityId}
              name={city.name}
              country={city.country}
              imageUrl={city.imageUrl}
            />
          ))
        ) : (
          <p style={{ textAlign:  "center", width: "100%", color: "white", fontFamily: "'Montserrat', sans-serif"  }}>Cargando ciudades...</p>
        )}
      </div>
    </section>
  );
};

export default CitiesPlaces;
