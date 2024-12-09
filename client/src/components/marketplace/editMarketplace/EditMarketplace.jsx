/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/userContext"; // Custom hook for user context
import {
  viewMarketplaceItem,
  updateMarketplaceItem,
} from "../../../api/marketplace"; // API methods for fetching and updating listings
import { useNavigate, useParams } from "react-router-dom";
import "./editMarketplace.css";

const EditMarketplace = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    condition: "",
    address: "",
    city: "",
    state: "",
    offers: "",
    images: [], // For storing both existing and new images
    updatedImages: [],
    user_id: "", // User ID of the person editing the listing
  });

  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // Get the user from context
  const { id } = useParams(); // Extract listing ID from URL params
  const navigate = useNavigate(); // Use navigate for redirection after success

  // Fetch existing marketplace listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listing = await viewMarketplaceItem({ id }); // API call to get listing details
        setFormData({
          ...listing[0],
          images: listing[0].images || [], // Ensure existing images are set
          user_id: listing[0].user_id || user.id, // Set user ID
        });
        setLoading(false);
      } catch (error) {
        alert("Failed to load the listing. Please try again.");
        setLoading(false);
      }
    };

    fetchListing(); // Trigger fetching when component mounts
  }, [id, user.id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update corresponding field in formData state
    });
  };

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

  // Handle form submission to update the listing
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
      const response = await updateMarketplaceItem(data); // API call to update the listing
      if (response.success) {
        alert("Product updated successfully!");
        navigate("/manageMarketplace"); // Redirect to marketplace after successful update
      } else {
        alert("Failed to update the product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <div className="edit-marketplace-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back My Marketplace Items
      </button>
      <h2 className="center color">Edit Product</h2>

      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="edit-marketplace-form">
          <label>
            Product Name:*
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:*
            <select
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Others">Others</option>
            </select>
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
              type="float"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Condition:*
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Refurbished">Refurbished</option>
              <option value="Likely New">Likely New</option>
            </select>
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

          <label>
            Offers:*
            <input
              type="text"
              name="offers"
              value={formData.offers}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-btn">
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default EditMarketplace;
