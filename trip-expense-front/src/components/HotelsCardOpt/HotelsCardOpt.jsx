import React, { useEffect, useState } from 'react';
import './HotelsCardOpt.css';
import { useNavigate } from "react-router-dom";
import ImgH1 from '../../assets/ImgHotel1.jpg';
import ImgH2 from '../../assets/ImgHotel2.jpg';
import ImgH3 from '../../assets/ImgHotel3.jpg';
import ImgH4 from '../../assets/ImgHotel4.jpg';
import ImgH5 from '../../assets/ImgHotel5.jpg';
import ImgH6 from '../../assets/ImgHotel6.jpg';
import ImgH7 from '../../assets/ImgHotel7.jpg';
import ImgH8 from '../../assets/ImgHotel8.jpg';

const HotelsCardOpt = () => {
  const navigate = useNavigate();

  const handleHotelsViewClick = () => {
    navigate("/hotels-view");
  };

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              {
                id: 1,
                hotelName: 'The Green Park Pendik',
                description: 'Hotel de 5 estrellas, situado en el centro del distrito de Pendik, ofrece habitaciones de lujo con TV LCD y ducha de efecto lluvia.',
                country: 'Turquía',
                city: 'Estambul',
                hotelImageUrl: ImgH1,
                stars: 5,
                price: 115,
              },
              {
                id: 2,
                hotelName: 'Anthemis Hotel',
                description: 'Se encuentra en el corazón de la península histórica, a 400 metros de Santa Sofía, y ofrece WiFi gratuita, restaurante y bar.',
                country: 'Turquía',
                city: 'Estambul',
                hotelImageUrl: ImgH2,
                stars: 5,
                price: 155,
              },
              {
                id: 3,
                hotelName: 'Hyatt Regency Sydney',
                description: 'Este hotel recién reformado está situado junto al puerto Darling Harbour, en el distrito central de negocios de Sídney, y es perfecto para estancias de ocio o de negocios.',
                country: 'Australia',
                city: 'Sydney',
                hotelImageUrl: ImgH3,
                stars: 5,
                price: 193,
              },
              {
                id: 4,
                hotelName: 'ibis Budget - St Peters',
                description: 'Ofrece alojamiento económico a solo 10 minutos a pie de la estación de tren de St. Peters y a 10 minutos en coche del aeropuerto de Sídney.',
                country: 'Australia',
                city: 'Sydney',
                hotelImageUrl: ImgH4,
                stars: 3,
                price: 65,
              },
              {
                id: 5,
                hotelName: 'Malakan Hotel Baku',
                description: 'Alojamiento hubicado en Baku, a 10 min a pie de Maiden Tower. Dispone de bañera de hidromasaje, servicio de traslado gratuito y wifi gratis en todo el alojamiento.',
                country: 'Azerbaiyán',
                city: 'Baku',
                hotelImageUrl: ImgH5,
                stars: 4,
                price: 33,
              },
              {
                id: 6,
                hotelName: 'Aden City Hotel',
                description: 'Ofrece una terraza con vista a la ciudad y tiene habitaciones con aire acondicionado, wifi gratis y baño privado. Hay un restaurante de cocina turca y parking privado gratis.',
                country: 'Azerbaiyán',
                city: 'Baku',
                hotelImageUrl: ImgH6,
                stars: 3,
                price: 50,
              },
              {
                id: 7,
                hotelName: 'Hilton Maldives Amingiri Resort & Spa',
                description: 'Se encuentra en medio de las tranquilas aguas azules del atolón de North Malé y ofrece alojamiento frente a la playa.',
                country: 'Maldivas',
                city: 'Malé',
                hotelImageUrl: ImgH7,
                stars: 5,
                price: 910,
              },
              {
                id: 8,
                hotelName: 'Summer Beach Maldives',
                description: 'Dispone de servicio de conserjería, habitaciones libres de humo, terraza, wifi gratis en todo el alojamiento y restaurante.',
                country: 'Maldivas',
                city: 'Malé',
                hotelImageUrl: ImgH8,
                stars: 4,
                price: 120,
              },
            ]);
          }, 1000)
        );

        setHotels(data);
      } catch (err) {
        setError('Error cargando hoteles');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <div className="hco-loading">Cargando hoteles...</div>;
  if (error) return <div className="hco-error">⚠️ {error}</div>;

  return (
    <>
      {hotels.map((hotel) => (
        <div className="hco-card" key={hotel.id}>
          <div className="hco-card-left">
            <img
              src={hotel.hotelImageUrl || '/default-logo.png'}
              alt={hotel.hotelName}
              className="hco-logo"
            />
          </div>

          <div className="hco-card-center">
            <div>
              <h2 className="hco-name">{hotel.hotelName}</h2>
              <p className="hco-place">📍 Hotel en {hotel.city}, {hotel.country}</p>
            </div>
            <div className="hco-section">
              <p className="hco-description">
                {hotel.description} <br />
              </p>
            </div>

            <div className="hco-duration">1 noche, 2 adutos</div>
          </div>

          <div className="hco-card-right">
            <div className="hco-section">
              <div className="hco-stars">{"★".repeat(hotel.stars)}</div>
            </div>
            <div>
              <div className="hco-old-price">${(hotel.price * 1.3).toFixed(0)} USD</div>
              <div className="hco-price">${hotel.price} USD</div>
            </div>
            <button className="hco-btn" onClick={handleHotelsViewClick}>Ver hotel</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelsCardOpt;
