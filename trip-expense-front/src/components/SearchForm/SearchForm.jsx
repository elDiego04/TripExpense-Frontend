import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SearchForm.css";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState({ checkIn: false, checkOut: false });
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");

  const navigate = useNavigate();

  

  return (
    <div className="search-container">
      <div className="search-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Ciudad de Origen"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Ciudad de Destino"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search-input"
          />

          <select
            value={adults}
            onChange={(e) => setAdults(parseInt(e.target.value))}
            className="select-dropdown"
          >
            <option value="" disabled>
              Adultos
            </option>
            {[...Array(6).keys()].map((num) => (
              <option key={num} value={num + 1}>
                {num + 1} Adulto(s)
              </option>
            ))}
          </select>

          <div className="date-picker">
            <input
              type="text"
              readOnly
              placeholder="Check-In"
              value={checkInDate ? checkInDate.toLocaleDateString() : ""}
              className="search-input"
              onClick={() =>
                setShowCalendar((prev) => ({ ...prev, checkIn: !prev.checkIn }))
              }
            />
            {showCalendar.checkIn && (
              <div className="calendar-dropdown">
                <Calendar
                  onChange={(date) => {
                    setCheckInDate(date);
                    setShowCalendar((prev) => ({ ...prev, checkIn: false }));
                  }}
                  value={checkInDate || new Date()}
                />
              </div>
            )}
          </div>

          <div className="date-picker">
            <input
              type="text"
              readOnly
              placeholder="Check-Out"
              value={checkOutDate ? checkOutDate.toLocaleDateString() : ""}
              className="search-input"
              onClick={() =>
                setShowCalendar((prev) => ({ ...prev, checkOut: !prev.checkOut }))
              }
            />
            {showCalendar.checkOut && (
              <div className="calendar-dropdown">
                <Calendar
                  onChange={(date) => {
                    setCheckOutDate(date);
                    setShowCalendar((prev) => ({ ...prev, checkOut: false }));
                  }}
                  value={checkOutDate || new Date()}
                />
              </div>
            )}
          </div>

          <select
            value={children}
            onChange={(e) => setChildren(parseInt(e.target.value))}
            className="select-dropdown"
          >
            <option value="" disabled>
              Niños
            </option>
            {[...Array(6).keys()].map((num) => (
              <option key={num} value={num}>
                {num} Niño(s)
              </option>
            ))}
          </select>
        </div>

        <button className="search-button">
          <strong>Buscar Viajes</strong>
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
