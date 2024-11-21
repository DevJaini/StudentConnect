import React, { useState, useEffect } from "react";
import { viewAllListings } from "../../api/listings"; // Import the viewAllListings function
import { useUser } from "../../context/userContext"; // Import useUser to access user context
import { useNavigate } from "react-router-dom";
import "./listings.css";

const Listings = () => {
  const [listings, setProperties] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const fetchedProperties = await viewAllListings();
        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, []);

  const handleAddProperty = () => {
    if (user) {
      navigate("/addListings");
    } else {
      alert("Please log in to add a property.");
      navigate("/signin");
    }
  };

  const handleManageProperties = () => {
    if (user) {
      navigate("/manageListings");
    } else {
      alert("Please log in to manage your properties.");
      navigate("/signin");
    }
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="color">Apartment Listings</h1>
        <div className="header-buttons">
          {user && (
            <>
              <button className="header-btn" onClick={handleAddProperty}>
                Add Property
              </button>
              <button className="header-btn" onClick={handleManageProperties}>
                Manage My Properties
              </button>
            </>
          )}
        </div>
      </div>
      <div className="property-list">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="property-card"
            onClick={() => navigate(`/viewListing/${listing.id}`)}
          >
            <div className="image-gallery">
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[0]} // Show only the first image
                  alt={listing.title}
                  className="listing-images" // Add a class to style the image
                />
              ) : (
                <div className="no-image">No Images Available</div> // Placeholder if no images
              )}
            </div>
            <h3>{listing.title}</h3>
            <p>Type: {listing.type}</p>
            <p>Location: {listing.city}</p>
            <p>Price: ${listing.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
