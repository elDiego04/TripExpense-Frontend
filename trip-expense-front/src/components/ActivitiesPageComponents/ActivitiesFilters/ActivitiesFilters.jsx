import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./ActivitiesFilters.css";

const categories = [
  "Aventura",
  "Cultura",
  "Gastronomía",
  "Naturaleza",
  "Deportes",
  "Entretenimiento",
  "Relajación",
  "Educativa",
];

const difficulties = ["Fácil", "Media", "Difícil"];

const ActivitiesFilters = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    price: "",
    city: "",
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    const cleared = {
      category: "",
      difficulty: "",
      price: "",
      city: "",
    };
    setFilters(cleared);
    onSearch(cleared);
  };

  return (
    <div className="ap-filters-wrapper">
      <h2 className="ap-filters-title">Filtrar actividades</h2>
      <div className="ap-filters-container">
        <select value={filters.category} onChange={(e) => handleChange("category", e.target.value)}>
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={filters.difficulty} onChange={(e) => handleChange("difficulty", e.target.value)}>
          <option value="">Todas las dificultades</option>
          {difficulties.map((dif) => (
            <option key={dif} value={dif}>
              {dif}
            </option>
          ))}
        </select>

        <select value={filters.price} onChange={(e) => handleChange("price", e.target.value)}>
          <option value="">Todos los precios</option>
          <option value="0-50">Hasta $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-200">$101 - $200</option>
          <option value="201+">Más de $200</option>
        </select>

        <input
          type="text"
          placeholder="Buscar por ciudad"
          value={filters.city}
          onChange={(e) => handleChange("city", e.target.value)}
          className="ap-city-input"
        />

        <div className="ap-buttons-container">
          <div className="tooltip-container">
            <button className="ap-search-button" onClick={handleSearch}>
              <FaSearch />
            </button>
            <span className="tooltip-text tooltip-orange">Buscar</span>
          </div>
          <div className="tooltip-container">
            <button className="ap-clear-button" onClick={handleClear}>
              <FaTimes />
            </button>
            <span className="tooltip-text tooltip-red">Borrar filtros</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitiesFilters;
