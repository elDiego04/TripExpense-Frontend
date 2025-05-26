import React, { useState } from 'react';
import './FiltersHotels.css';

const FiltersHotels = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [stars, setStars] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const filters = {
      country,
      city,
      maxPrice,
      stars,
    };
    console.log(filters);
    // Aquí puedes pasar los filtros al componente padre vía props o contexto.
  };

  return (
    <aside className="filters-sidebar">
      <h3 className="fs-title">Filtros de hoteles</h3>
      <form onSubmit={handleSubmit} className="fs-form">

        <div className="fs-form-group">
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Ej: Australia"
          />
        </div>

        <div className="fs-form-group">
          <label htmlFor="city">Ciudad</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ej: Sídney"
          />
        </div>

        <div className="fs-form-group">
          <label htmlFor="maxPrice">Precio máximo (USD)</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Ej: 500"
          />
        </div>

        <div className="fs-form-group">
          <label htmlFor="stars">Estrellas</label>
          <input
            type="number"
            id="stars"
            checked={stars}
            onChange={(e) => setStars(e.target.value)}
            placeholder="Ej: 3"
          />
        </div>

        <button type="submit" className="fs-button">
          Aplicar filtros
        </button>
      </form>
    </aside>
  );
};

export default FiltersHotels;
