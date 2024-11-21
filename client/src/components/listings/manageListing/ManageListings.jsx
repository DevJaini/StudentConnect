import React, { useState, useEffect } from "react";
import { viewUserListings, archiveListing } from "../../../api/listings"; // Import the viewAllListings and archiveListing functions
import { useUser } from "../../../context/userContext"; // Import useUser to access user context
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaHome } from "react-icons/fa"; // Import FontAwesome icons
import "./manageListing.css";

const ManageListings = () => {
  const [listings, setProperties] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch user listings when the component mounts or when user.id changes
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const fetchedProperties = await viewUserListings(user.id);
        console.log("Fetched Listings", fetchedProperties);
        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
        navigate("/"); // Navigate back to home on error
      }
    };
    if (user?.id) {
      fetchProperties();
    }
  }, [user.id, navigate]);

  // Handle Edit action
  const handleEdit = (listingId) => {
    navigate(`/editListing/${listingId}`); // Navigate to the edit page for this specific listing
  };

  // Handle Delete action
  const handleDelete = async (listingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (confirmDelete) {
      try {
        await archiveListing(listingId); // Call API to delete the listing
        setProperties(
          (prevListings) =>
            prevListings.filter((listing) => listing.id !== listingId) // Remove the deleted listing from the state
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
        <h1 className="color">Manage Your Properties</h1>
      </div>
      <div className="property-list">
        {listings.map((listing) => (
          <div key={listing.id} className="property-card">
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
            <div className="center">
              <h3>{listing.title}</h3>
              <div className="location-type">
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
                  onClick={() => handleEdit(listing.id)} // Navigate to edit page
                  title="Edit"
                >
                  ✏️
                </span>
                <span
                  className="delete-icon"
                  onClick={() => handleDelete(listing.id)} // Call delete function
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

export default ManageListings;
