import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ActivitiesCard from "../ActivitiesCard/ActivitiesCard";
import api from "../../../services/api";
import "./ActivitiesPlaces.css";

const ActivitiesPlaces = ({ searchTerm, filters }) => {
  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, citiesRes] = await Promise.all([
          api.get("/activities"),
          api.get("/cities"),
        ]);
        setActivities(activitiesRes.data);
        setCities(citiesRes.data);
        setFilteredActivities(activitiesRes.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let results = activities;

    if (searchTerm.trim()) {
      results = results.filter((a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      results = results.filter((a) => a.category === filters.category);
    }

    if (filters.difficulty) {
      results = results.filter((a) => a.difficultyLevel === filters.difficulty);
    }

    if (results.length > 0) {
      setFilteredActivities(results);
      setNotFound(false);
    } else {
      setFilteredActivities([]);
      setNotFound(true);
    }
  }, [searchTerm, filters, activities]);

  const getCityName = (cityId) => {
    const city = cities.find((c) => c.cityId === cityId);
    return city ? city.name : "Ciudad desconocida";
  };

  return (
    <section className="ap-places">
      <div className="ap-places-header">
        <h2>Actividades que te esperan</h2>
        <p>Descubre experiencias únicas en cada destino</p>
      </div>
      <div className="ap-places-cards">
        {notFound ? (
          <p className="ap-no-results">No se encontraron actividades.</p>
        ) : filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivitiesCard
              key={activity.activityId}
              activityId={activity.activityId}
              name={activity.name}
              imageUrl={activity.imageUrl}
              cityName={getCityName(activity.city.cityId)}
            />
          ))
        ) : (
          <p className="ap-loading">Cargando actividades...</p>
        )}
      </div>
    </section>
  );
};

export default ActivitiesPlaces;
