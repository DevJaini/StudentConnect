import React, { useState, useEffect } from "react";
import { useUser } from "../../context/userContext"; // Import useUser to access user context
import { useNavigate, useLocation } from "react-router-dom"; // Use useLocation to get state
import { viewAllListings } from "../../api/listings";
import "./listings.css";

const Listings = () => {
  const [listings, setProperties] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation(); // Access the current location (with state)

  // Check if listings are passed via the state (from Hero page)
  useEffect(() => {
    if (location.state && location.state.listings) {
      setProperties(location.state.listings); // Set the listings if provided via state
    } else {
      // Fallback: fetch listings from API if no data passed via state
      const fetchProperties = async () => {
        try {
          const fetchedProperties = await viewAllListings();
          setProperties(fetchedProperties);
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };
      fetchProperties();
    }
  }, [location.state]); // Depend on location.state to re-trigger effect if needed

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
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing.id}
              className="property-card"
              onClick={() =>
                navigate(`/viewListing`, {
                  state: { id: listing.id }, // Pass id and entire listing object if needed
                })
              }
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
          ))
        ) : (
          <p className="message">No listings available</p> // Display message when no listings are available
        )}
      </div>
    </div>
  );
};

export default Listings;
