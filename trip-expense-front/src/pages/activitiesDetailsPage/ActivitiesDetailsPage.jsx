import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";
import "./ActivitiesDetailsPage.css"; 
import Navbar from "../../components/Navbar/Navbar";

const ActivityDetailsPage = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [cities, setCities] = useState([]);

  const getCityName = (cityId) => {
    if (!cityId) return "Ciudad desconocida";
    const city = cities.find((c) => c.cityId === cityId);
    return city ? city.name : "Ciudad desconocida";
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await api.get(`/activities/${activityId}`);
        setActivity(res.data);
      } catch (err) {
        console.error("Error al obtener la actividad:", err);
      }
    };

    if (activityId) {
      fetchActivity();
    }
  }, [activityId]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await api.get("/cities");
        setCities(res.data);
      } catch (error) {
        console.error("Error al obtener ciudades:", error);
      }
    };
    fetchCities();
  }, []);

  if (!activity || cities.length === 0) {
    return <div className="activity-details-loading">Cargando información...</div>;
  }

  return (
    <div className="activity-details-container">
      <Navbar />
      <div className="activity-details-card">
        <div className="activity-details-left">
          <button className="activity-back-button" onClick={() => navigate("/activities")}>
            <FaArrowLeft /> Volver
          </button>
          <div className="activity-details-image">
            <img src={activity.imageUrl || "../../../assets/Maldives.jpg"} alt={activity.name} />
          </div>
        </div>

        <div className="activity-details-info">
          <h2>{activity.name}</h2>
          <p><strong>Ciudad:</strong> {getCityName(activity.cityId) || "No disponible"}</p>
          <p><strong>Descripción:</strong> {activity.description || "No disponible"}</p>
          <p><strong>Categoría:</strong> {activity.category || "No disponible"}</p>
          <p><strong>Duración:</strong> {activity.duration ? `${activity.duration} minutos` : "No disponible"}</p>
          <p><strong>Ubicación:</strong> {activity.location || "No disponible"}</p>
          <p><strong>Dificultad:</strong> {activity.difficultyLevel || "No disponible"}</p>
          <p><strong>Precio:</strong> {activity.price !== undefined ? `$${activity.price}` : "No disponible"}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
