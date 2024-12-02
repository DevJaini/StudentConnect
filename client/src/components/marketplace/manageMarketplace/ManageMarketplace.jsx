import React, { useState, useEffect } from "react";
import {
  viewMarketplaceItem,
  archiveMarketplaceItem,
} from "../../../api/marketplace"; // API calls to get marketplace listings and archive them
import { useUser } from "../../../context/userContext"; // Accessing user context
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa"; // Icons for location and type
import "./manageMarketplace.css";

const ManageMarketplace = () => {
  const [listings, setListings] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch marketplace listings when component mounts or when user.id changes
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const fetchedListings = await viewMarketplaceItem(user.id); // Fetching listings for the user
        console.log("Fetched Marketplace Listings", fetchedListings);
        setListings(fetchedListings);
      } catch (error) {
        console.error("Error fetching marketplace listings:", error);
        navigate("/"); // Navigate to homepage on error
      }
    };

    if (user?.id) {
      fetchListings();
    }
  }, [user.id, navigate]);

  // Handle Edit action
  const handleEdit = (listingId) => {
    navigate(`/editListing/${listingId}`); // Navigate to the edit page for this listing
  };

  // Handle Delete action
  const handleDelete = async (listingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (confirmDelete) {
      try {
        await archiveMarketplaceItem(listingId); // Archive the listing (delete action)
        setListings(
          (prevListings) =>
            prevListings.filter((listing) => listing.id !== listingId) // Remove deleted listing from state
        );
        alert("Listing deleted successfully.");
      } catch (error) {
        console.error("Error deleting listing:", error);
        alert("Failed to delete listing.");
      }
    }
  };

  return (
    <div>
      <div className="header-container">
        <h1 className="color">Marketplace</h1>
        <div className="header-buttons">
          {/* Add button to create a new listing */}
          <button
            className="header-btn"
            onClick={() => navigate("/createListing")}
          >
            Create Listing
          </button>
        </div>
      </div>

      <div className="listing-grid">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-card">
            <div className="image-gallery">
              {listing.images && listing.images.length > 0 ? (
                <img
                  src={listing.images[0]} // Show the first image in the array
                  alt={listing.title}
                  className="listing-image"
                />
              ) : (
                <div className="no-image">No Images Available</div> // Fallback if no images exist
              )}
            </div>

            <div className="listing-details">
              <h3>{listing.title}</h3>
              <div className="listing-location-type">
                <p>
                  <FaMapMarkerAlt
                    style={{ color: "#27ae60", marginRight: "5px" }}
                  />
                  {listing.city}
                </p>
                <p>
                  <FaHome style={{ color: "#27ae60", marginRight: "5px" }} />
                  {listing.type}
                </p>
              </div>
              <p>Price: ${listing.price}</p>

              <div className="action-buttons">
                <span
                  className="edit-icon"
                  onClick={() => handleEdit(listing.id)} // Edit the listing
                  title="Edit"
                >
                  ✏️
                </span>
                <span
                  className="delete-icon"
                  onClick={() => handleDelete(listing.id)} // Delete the listing
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
