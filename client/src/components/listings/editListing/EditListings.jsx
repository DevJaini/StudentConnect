/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { viewListing, updateListing } from "../../../api/listings"; // API methods
import { useNavigate, useLocation } from "react-router-dom";
import "./editListings.css";

const EditListing = () => {
  const [formData, setFormData] = useState({
    city: "",
    size: "",
    bathrooms: "",
    state: "",
    address: "",
    title: "",
    description: "",
    price: "",
    school: "",
    category: "",
    type: "",
    facilities: "",
    offers: "",
    fees_policies: "",
    images: [], // Old images (URLs)
    updatedImages: [], // New images (files)
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Access the current location (with state)
  const navigate = useNavigate();

  const { id } = location.state || {}; // Destructure id from state

  // Fetch the existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listing = await viewListing({ id }); // Fetch listing data by ID
        setFormData({
          ...listing[0],
          images: listing[0].images || [], // Set existing images if available
        });
        setLoading(false);
      } catch (error) {
        alert("Failed to load the listing. Please try again.");
        setLoading(false);
      }
    };

    fetchListing(); // Trigger the fetch on component mount
  }, [id]);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the formData state with the new value
    });
  };

  // Handle new image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setFormData({
      ...formData,
      updatedImages: [...files], // Append new files to updatedImages
    });
  };

  // Handle removing an old image
  const removeOldImage = (index) => {
    const updatedOldImages = [...formData.images];
    updatedOldImages.splice(index, 1); // Remove the image at the specified index
    setFormData({
      ...formData,
      images: [...updatedOldImages],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true); // Set loading state to true while submitting

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "images" && key !== "updatedImages") {
        data.append(key, formData[key]); // Append all other form data
      }
    });

    data.append("images", JSON.stringify(formData.images)); // Convert array to JSON string for structured transfer

    if (formData.updatedImages && formData.updatedImages.length > 0) {
      formData.updatedImages.forEach((file) => {
        data.append("updatedImages", file); // Use 'updatedImages[]' for the new images array
      });
    }

    try {
      const response = await updateListing(data); // Call the API to update the listing
      if (response.success) {
        alert("Property updated successfully!");
        navigate("/manageListings"); // Redirect to listings page after successful update
      } else {
        alert("Failed to update property. Please try again.");
      }
    } catch (error) {
      alert("Error updating property. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <div className="add-property-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back My Listings
      </button>
      <h2 className="center color">Edit Property</h2>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="add-property-form">
          <label>
            City:*
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            State:*
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:*
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Title:*
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:*
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price:*
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Size in sqft:*
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Bathrooms:*
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            School:*
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:*
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Temporary Stay">Temporary Stay</option>
              <option value="Permanent Stay">Permanent Stay</option>
              <option value="Shared Space">Shared Space</option>
            </select>
          </label>
          <label>
            Type:*
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., 1 bed, Studio"
            />
          </label>
          <label>
            Facilities:
            <input
              type="text"
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              placeholder="e.g., WiFi, Parking"
            />
          </label>
          <label>
            Offers:
            <input
              type="text"
              name="offers"
              value={formData.offers}
              onChange={handleChange}
            />
          </label>
          <label>
            Fees & Policies:
            <textarea
              name="fees_policies"
              value={formData.fees_policies}
              onChange={handleChange}
            />
          </label>
          <label>
            Images:
            <input
              type="file"
              name="updatedImages"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
            {formData.images.length > 0 && (
              <div>
                <h3>Existing Images:</h3>
                <div className="existing-images">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="thumbnail"
                      />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeOldImage(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </label>
          <button type="submit" className="submit-btn">
            Update Property
          </button>
        </form>
      )}
    </div>
  );
};

export default EditListing;
