import React, { useState } from "react";
import "./HotelOptions.css";
import Navbar from "../../components/Navbar/Navbar";
import FiltersHotels from '../../components/FiltersHotels/FiltersHotels';
import HotelsCardOpt from "../../components/HotelsCardOpt/HotelsCardOpt";

const HotelOptions = () => {
  const [hotels, setFlights] = useState([
    {
      id: 1,
      hotelName: 'HotelName',
      description: 'HotelDescription',
      country: 'Country',
      city: 'City',
      stars: 5,
      price: 129,
    },
  ]);

  return (
    <div className="fo-container">
      <div className="fo-navbar">
        <Navbar />
      </div>
      <div className="fo-content">
        <FiltersHotels />
        <div className="fo-results">

          {hotels.map((hotel) => (
            <HotelsCardOpt key={hotel.id} hotels={hotel} />
          ))}
          <button className="fo-show-more">Ver más resultados</button>
        </div>
      </div>
    </div>
  );
};

export default HotelOptions;
