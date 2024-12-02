import React, { useState } from "react";
import { useUser } from "../../../context/userContext"; // Custom hook to get the logged-in user
import { addListing } from "../../../api/listings"; // API call to add property
import { useNavigate } from "react-router-dom";
import "./addListings.css"; // Assuming you have a CSS file for styling

const AddListings = () => {
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
    images: [], // Store image files here
  });

  const [loading, setLoading] = useState(false); // Loading state
  const { user } = useUser(); // Access user from context
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    setFormData({
      ...formData,
      images: files, // Store selected files in the form data
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    const data = new FormData(); // FormData object to send the data as multipart/form-data

    // Append all non-image fields to FormData
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        data.append(key, formData[key]); // Append text fields
      }
    });

    // Append images to FormData
    formData.images.forEach((image) => {
      data.append("images", image); // Append images
    });

    // Append the user ID (retrieved from the context) to the data
    data.append("user_id", user.id); // Assuming `user.id` gives the logged-in user's ID

    try {
      const response = await addListing(data); // Send the FormData object using the API function
      if (response.success === true) {
        alert("Property added successfully!");
        navigate("/listings"); // Redirect to listings page
      } else {
        alert("Failed to add property. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading property:", error);
      alert("Error uploading property. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="add-property-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Listings
      </button>
      <h2 className="center color">Add New Property</h2>
      {loading ? ( // Show spinner while loading
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
              placeholder="(Only in numbers)"
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
              placeholder="e.g., 100 (Only in numbers)"
              required
            />
          </label>

          <label>
            Bathrooms:*
            <input
              type="float"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="(Only in numbers)"
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
              placeholder="e.g., 1 beds, Studio"
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
            Images:*
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple // Allow multiple file uploads
              accept="image/*" // Restrict to image files only
              required
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

          {/* Hidden input for user_id (retrieved from the user context) */}
          <input type="hidden" name="user_id" value={user.id} />

          <button type="submit" className="submit-btn">
            Add Property
          </button>
        </form>
      )}
    </div>
  );
};

export default AddListings;
