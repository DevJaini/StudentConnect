import React, { useState, useEffect } from "react";
import { viewAllMarketplaceItems } from "../../api/marketplace"; // API call for marketplace items
import { useUser } from "../../context/userContext"; // Import useUser to access user context
import { useNavigate } from "react-router-dom";
import "./marketplace.css"; // Separate CSS for Marketplace

const Marketplace = () => {
  const [items, setItems] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarketplaceItems = async () => {
      try {
        const fetchedItems = await viewAllMarketplaceItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching marketplace items:", error);
      }
    };
    fetchMarketplaceItems();
  }, []);

  const handleAddItem = () => {
    if (user) {
      navigate("/addMarketplaceItem");
    } else {
      alert("Please log in to add an item.");
      navigate("/signin");
    }
  };

  const handleManageItems = () => {
    if (user) {
      navigate("/manageMarketplaceItems");
    } else {
      alert("Please log in to manage your items.");
      navigate("/signin");
    }
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="color">Marketplace</h1>
        <div className="header-buttons">
          {user && (
            <>
              <button className="header-btn" onClick={handleAddItem}>
                Add Item
              </button>
              <button className="header-btn" onClick={handleManageItems}>
                Manage My Items
              </button>
            </>
          )}
        </div>
      </div>
      <div className="item-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="item-card"
            onClick={() => navigate(`/viewMarketplaceItem/${item.id}`)}
          >
            <div className="image-gallery">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]} // Show only the first image
                  alt={item.title}
                  className="item-images" // Add a class to style the image
                />
              ) : (
                <div className="no-image">No Images Available</div> // Placeholder if no images
              )}
            </div>
            <h3>{item.title}</h3>
            <p>Category: {item.category}</p>
            <p>Location: {item.city}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
