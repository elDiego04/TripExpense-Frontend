import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CitiesHero from "../../components/CitiiesPageComponents/CitiiesHero/CitiesHero";
import CitiesSearchForm from "../../components/CitiiesPageComponents/CitiesSearchForm/CitiesSearchForm";
import CitiesPlaces from "../../components/CitiiesPageComponents/CitiesPlaces/CitiesPlaces";
import "./CitiesPage.css";

const CitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="cp_page">
      <Navbar className="cp_navbar" />
      <CitiesHero className="cp-hero">
        <CitiesSearchForm onSearch={handleSearch} className="cp-search" />
      </CitiesHero>
      <CitiesPlaces searchTerm={searchTerm} className="cp-places" />
    </div>
  );
};

export default CitiesPage;
