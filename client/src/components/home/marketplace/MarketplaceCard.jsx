import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { viewAllMarketplaceItems } from "../../../api/marketplace"; // Import the marketplace API
import { useUser } from "../../../context/userContext"; // Import useUser to access user context
import "./marketplace.css"; // Import CSS for styling

const MarketPlaceCard = () => {
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const { user } = useUser(); // Access user state from UserContext

  useEffect(() => {
    // Fetch all marketplace items and display the most recent 3
    const fetchMarketplaceItems = async () => {
      try {
        const items = await viewAllMarketplaceItems();
        setMarketplaceItems(items.slice(0, 3));
      } catch (error) {
        console.error("Error fetching marketplace items:", error);
      }
    };

    fetchMarketplaceItems();
  }, []);

  const handleViewMore = () => {
    if (user) {
      navigate("/marketplace");
    } else {
      setShowPrompt(true); // Show modal if the user is not logged in
    }
  };

  const closePrompt = () => setShowPrompt(false); // Close modal function

  return (
    <>
      <div className="content grid3 mtop">
        {marketplaceItems.map((item) => {
          const { id, category, city, state, title, price, condition, images } =
            item;
          return (
            <div className="box shadow" key={id}>
              {/* Display the first image */}
              <div className="image-container">
                {images && images.length > 0 ? (
                  <img
                    src={images[0]} // Show the first image in the array
                    alt={title}
                    className="marketplace-image" // Add a class for styling
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <div className="text">
                <div className="category flex">
                  <span
                    style={{
                      background: "#ff98001a",
                      color: "#ff9800",
                    }}
                  >
                    {category}
                  </span>
                </div>
                <h4>{title}</h4>
                <p>
                  <i className="fa fa-location-dot"></i> {city}, {state}
                </p>
              </div>
              <div className="button flex">
                <div>
                  <button className="btn2">{price}</button>
                  <label htmlFor=""> Dollars </label>
                </div>
                <span>{condition}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="view-more-container">
        <button className="view-more-btn" onClick={handleViewMore}>
          View More
        </button>
      </div>
      {/* Login Prompt Modal */}
      {showPrompt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Please Log In or Sign Up</h3>
            <p>You need to be logged in to view more marketplace items.</p>
            <div className="modal-buttons">
              <button className="btn-login" onClick={() => navigate("/signin")}>
                Log In
              </button>
              <button
                className="btn-signup"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
            <button className="btn-close" onClick={closePrompt}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketPlaceCard;
