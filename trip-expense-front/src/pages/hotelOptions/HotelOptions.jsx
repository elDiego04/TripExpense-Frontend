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
    <div className="ho-container">
      <Navbar className="navbar" />
      <div className="ho-content">
        <div className="ho-sidebar">
          <FiltersHotels />
        </div>
        <div className="ho-results">
          {hotels.map((hotel) => (
            <HotelsCardOpt key={hotel.id} hotels={hotel} />
          ))}
          <button className="ho-show-more">Ver más resultados</button>
        </div>
      </div>
    </div>
  );
};

export default HotelOptions;
