// ActivitiesPage.jsx
import React, { useState, useEffect } from "react";
import ActivitiesFilters from "../../components/ActivitiesPageComponents/ActivitiesFilters/ActivitiesFilters";
import ActivitiesCard from "../../components/ActivitiesPageComponents/ActivitiesCard/ActivitiesCard";
import Navbar from "../../components/Navbar/Navbar";
import ActivitiesHero from "../../components/ActivitiesPageComponents/ActivitiesHero/ActivitiesHero";
import api from "../../services/api";
import "../../components/ActivitiesPageComponents/ActivitiesPlaces/ActivitiesPlaces.css";
import "./ActivitiesPage.css";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({}); 

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
        setNotFound(activitiesRes.data.length === 0);
      } catch (err) {
        console.error(err);
        setActivities([]);
        setFilteredActivities([]);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!activities.length) return;

    let results = activities;

    if (activeFilters.category) {
      results = results.filter((a) => a.category === activeFilters.category);
    }

    if (activeFilters.difficulty) {
      results = results.filter((a) => a.difficultyLevel === activeFilters.difficulty);
    }

    if (activeFilters.price) {
      if (activeFilters.price === "201+") {
        results = results.filter((a) => a.price > 200);
      } else {
        const [min, max] = activeFilters.price.split("-").map(Number);
        results = results.filter((a) => a.price >= min && a.price <= max);
      }
    }

    if (activeFilters.city && activeFilters.city.trim() !== "") {
      const cityObj = cities.find(
        (c) => c.name.toLowerCase() === activeFilters.city.toLowerCase()
      );
      if (cityObj) {
        results = results.filter((a) => a.cityId === cityObj.cityId);
      } else {
        results = [];
      }
    }

    setFilteredActivities(results);
    setNotFound(results.length === 0);
  }, [activeFilters, activities, cities]);

  const handleFiltersSearch = (filters) => {
    setActiveFilters(filters);
  };

  const getCityName = (cityId) => {
    if (!cityId) return "Ciudad desconocida";
    const city = cities.find((c) => c.cityId === cityId);
    return city ? city.name : "Ciudad desconocida";
  };

  return (
    
    <div className="activities-page">
      <Navbar />
      <ActivitiesHero />

      <ActivitiesFilters onSearch={handleFiltersSearch} />

      <section className="ap-places">
        <div className="ap-places-header">
          <h2>Actividades que te esperan</h2>
          <p>Descubre experiencias únicas en cada destino</p>
        </div>

        <div className="ap-places-cards">
          {loading ? (
            <p className="ap-loading">Cargando actividades...</p>
          ) : notFound ? (
            <p className="ap-no-results">No se encontraron actividades.</p>
          ) : filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <ActivitiesCard
                key={activity.activityId}
                activityId={activity.activityId}
                name={activity.name}
                imageUrl={activity.imageUrl}
                cityName={getCityName(activity.cityId)}
              />
            ))
          ) : (
            <p className="ap-no-results">No hay actividades disponibles.</p>
          )}
        </div>
      </section>
      </div>
  );
};

export default ActivitiesPage;
