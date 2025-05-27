import React, { useState } from "react";
import "./CitiesSearchForm.css";

const CitiesSearchForm = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (city.trim() === "") {
      setError("Por favor ingresa una ciudad");
    } else {
      setError("");
      onSearch(city.trim());
    }
  };

  return (
    <div className="csf-container">
      <div className="csf-form">
        <input
          type="text"
          placeholder={error ? "Por favor ingresa una ciudad" : "Buscar ciudad"}
          value={city}
          onChange={(e) => {
            const value = e.target.value;
            setCity(value);
            if (value.trim() === "") {
              setError("");
              onSearch(""); 
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className={`csf-input ${error ? "csf-input-error" : ""}`}
        />
        <button className="csf-button" onClick={handleSearch}>
          <strong>Buscar ciudad</strong>
        </button>
      </div>
    </div>
  );
};

export default CitiesSearchForm;
