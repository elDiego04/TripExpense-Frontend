import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import LoginPage from './pages/loginPage/LoginPage.jsx';
import SignUpPage from './pages/signUpPage/SignUpPage.jsx';
import LandingPage from './pages/landingPage/LandingPage.jsx';
import FlightsPage from './pages/flightsPage/FlightsPage.jsx';
import HotelsPage from './pages/hotelsPage/HotelsPage.jsx';
import FlightOptions from './pages/FlightOptions/FlightOptions.jsx';
import AdminPage from './pages/adminPage/AdminPage.jsx'
import UnauthorizedPage from './pages/unauthorizedPage/unauthorizedPage.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import CitiesPage from './pages/citiesPage/CitiesPage.jsx';
import CityDetailsPage from './pages/cityDetailsPage/CityDetailsPage.jsx';
import HotelOptions from './pages/hotelOptions/HotelOptions.jsx';
import HotelsViews from './pages/hotelsViews/HotelsViews.jsx';
import ActivitiesPage from './pages/activitiesPage/ActivitiesPage.jsx';
import ActivitiesDetailsPage from './pages/activitiesDetailsPage/ActivitiesDetailsPage.jsx';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminPage />
            </ProtectedRoute>
          } />
        <Route path="/home" element={<HotelsPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/cities/:cityId" element={<CityDetailsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:activityId" element={<ActivitiesDetailsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/activities/:activityId" element={<ActivitiesDetailsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/flights-options" element={<FlightOptions />} />
        <Route path="/hotels-options" element={<HotelOptions />} />
        <Route path="/hotels-view" element={<HotelsViews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
