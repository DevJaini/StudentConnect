import React, { useState, useEffect } from "react";
import {
  viewMarketplaceItem,
  updateMarketplaceItem,
} from "../../../api/marketplace"; // API calls to get marketplace marketplaces and archive them
import { useUser } from "../../../context/userContext"; // Accessing user context
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa"; // Icons for location and type
import "./manageMarketplace.css";

const ManageMarketplace = () => {
  const [items, setMarketplaceItems] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch marketplace marketplaces when component mounts or when user.id changes
  useEffect(() => {
    const fetchMarketplaceItems = async () => {
      try {
        const fetchedMarketplace = await viewMarketplaceItem({
          user_id: user.id,
        }); // Fetching marketplaces for the user
        setMarketplaceItems(fetchedMarketplace);
      } catch (error) {
        console.error("Error fetching marketplace marketplace items:", error);
        navigate("/"); // Navigate to homepage on error
      }
    };

    if (user?.id) {
      fetchMarketplaceItems();
    }
  }, [user.id, navigate]);

  // Handle Edit action
  const handleEdit = (marketplaceId) => {
    navigate(`/editMarketplace`, {
      state: { id: marketplaceId }, // Pass id and entire marketplace object if needed
    });
  };

  // Handle Delete action
  const handleDelete = async (marketplaceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this marketplace item?"
    );
    if (confirmDelete) {
      try {
        await updateMarketplaceItem({
          id: marketplaceId,
          archived: true,
        }); // Call API to delete the listing
        setMarketplaceItems(
          (prevMarketplace) =>
            prevMarketplace.filter((item) => item.id !== marketplaceId) // Remove deleted marketplace from state
        );
        alert("Marketplace Item deleted successfully.");
      } catch (error) {
        console.error("Error deleting marketplace item:", error);
        alert("Failed to delete marketplace item.");
      }
    }
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="color">Manage Your Marketplace</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr; Back to Marketplace
        </button>
      </div>

      <div className="marketplace-grid">
        {items.map((item) => (
          <div key={item.id} className="marketplace-card">
            <div className="image-gallery">
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]} // Show the first image in the array
                  alt={item.title}
                  className="marketplace-image"
                />
              ) : (
                <div className="no-image">No Images Available</div> // Fallback if no images exist
              )}
            </div>

            <div className="marketplace-details">
              <h3>{item.title}</h3>
              <div className="marketplace-location-type">
                <p>
                  <FaMapMarkerAlt
                    style={{ color: "#27ae60", marginRight: "5px" }}
                  />
                  {item.city}
                </p>
              </div>
              <p>Price: ${item.price}</p>

              <div className="action-buttons">
                <span
                  className="edit-icon"
                  onClick={() => handleEdit(item.id)}
                  title="Edit"
                >
                  ✏️
                </span>
                <span
                  className="delete-icon"
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                >
                  🗑️
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMarketplace;
