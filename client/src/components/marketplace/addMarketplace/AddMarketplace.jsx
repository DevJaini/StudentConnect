import React, { useState } from "react";
import { useUser } from "../../../context/userContext"; // Custom hook to get the logged-in user
import { addMarketplaceItem } from "../../../api/marketplace"; // API call to add marketplace item
import { useNavigate } from "react-router-dom";
import "./addMarketplace.css"; // Assuming you have a CSS file for styling

const AddMarketplace = () => {
  const [formData, setFormData] = useState({
    city: "",
    state: "",
    address: "",
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
    offers: "",
    images: [], // Store image files here
    user_id: 0,
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
      user_id: user.id,
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

    try {
      const response = await addMarketplaceItem(data); // Send the FormData object using the API function
      if (response.success === true) {
        alert("Marketplace item added successfully!");
        navigate("/marketplace"); // Redirect to marketplace page
      } else {
        alert("Failed to add item. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading item:", error);
      alert("Error uploading item. Please try again.");
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="add-marketplace-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Marketplace
      </button>
      <h2 className="center color">Add New Item to Marketplace</h2>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="add-marketplace-form">
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
            Description:*
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mention complete details"
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
              placeholder="(Only in Numbers)"
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
            Category:*
            <select
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
            Condition:*
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              placeholder="(Mention in description details)"
              required
            >
              <option value="">Select Condition</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
              <option value="Likely New">Likely New</option>
              <option value="Refurbished">Refurbished</option>
            </select>
          </label>

          <label>
            Images:*
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
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
              placeholder="e.g., Discounts, Free Delivery"
            />
          </label>

          {/* Hidden input for user_id (retrieved from the user context) */}
          <input type="hidden" name="user_id" value={user.id} />

          <button type="submit" className="submit-btn">
            Add Item
          </button>
        </form>
      )}
    </div>
  );
};

export default AddMarketplace;
