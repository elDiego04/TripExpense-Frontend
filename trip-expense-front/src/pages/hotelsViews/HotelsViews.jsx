import React, { useState } from "react";
import "./HotelsViews.css"
import Navbar from "../../components/Navbar/Navbar";
import ViewHotel from "../../components/ViewHotel/ViewHotel";

const HotelsViews = () => {
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
        <div className="hv-container">
            <Navbar className="navbar" />
            <div className="hv-content">
                <div className="hv-results">
                    <ViewHotel />
                </div>
            </div>
        </div>
    );
};

export default HotelsViews;