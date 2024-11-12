import React, { useState, useEffect } from "react";
import { list } from "../data/Data"; // Assuming this contains your property listings
import "./listings.css";

const Listings = () => {
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    maxPrice: "",
  });
  const [filteredProperties, setFilteredProperties] = useState(list);

  // Get unique property types and locations from the list for dropdowns
  const propertyTypes = [...new Set(list.map((property) => property.type))];
  const locations = [...new Set(list.map((property) => property.location))];

  // Automatically update filteredProperties whenever filters change
  useEffect(() => {
    const filtered = list.filter((property) => {
      const matchesType = filters.type ? property.type === filters.type : true;
      const matchesLocation = filters.location
        ? property.location.includes(filters.location)
        : true;
      const matchesPrice = filters.maxPrice
        ? property.price <= parseInt(filters.maxPrice)
        : true;
      return matchesType && matchesLocation && matchesPrice;
    });
    setFilteredProperties(filtered);
  }, [filters]); // Depend on filters, so it re-runs when filters change

  // Handle filter changes dynamically
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <h1>Apartment Listings ({filteredProperties.length})</h1>

      {/* Dynamic Filter Section */}
      <div className="filter-section">
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          {propertyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        >
          <option value="">All Locations</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />

        <button
          onClick={() => setFilters({ type: "", location: "", maxPrice: "" })}
        >
          Reset Filters
        </button>
      </div>

      {/* Property List Section */}
      <div className="property-list">
        {filteredProperties.map((property, index) => (
          <div key={index} className="property-card">
            <img src={property.cover} alt={property.name} />
            <h3>{property.name}</h3>
            <p>Type: {property.type}</p>
            <p>Location: {property.location}</p>
            <p>Price: ${property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
