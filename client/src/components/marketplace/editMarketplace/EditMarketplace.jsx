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
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    condition: "",
    location: "",
    images: [], // For storing both existing and new images
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
        const listing = await viewMarketplaceItem(id); // API call to get listing details
        setFormData({
          ...listing,
          images: listing.images || [], // Ensure existing images are set
          user_id: listing.user_id || user.id, // Set user ID
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing:", error);
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

  // Handle new image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...formData.images, ...files], // Add new images to existing ones
    });
  };

  // Handle form submission to update the listing
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true while submitting

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        data.append(key, formData[key]); // Append all form fields except images
      }
    });

    // Append all images to the FormData object
    formData.images.forEach((image) => {
      data.append("images", image); // Append each image (either URL or file object)
    });

    // Ensure user_id is appended correctly
    if (Array.isArray(data.user_id)) {
      data.append("user_id", user.id[0]); // Handle case where user_id is an array
    } else {
      data.append("user_id", user.id); // Use user ID directly
    }

    try {
      const response = await updateMarketplaceItem(id, data); // API call to update the listing
      if (response.success) {
        alert("Product updated successfully!");
        navigate("/marketplace"); // Redirect to marketplace after successful update
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:*
            <input
              type="text"
              name="category"
              value={formData.category}
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
            Stock Quantity:*
            <input
              type="number"
              name="stock"
              value={formData.stock}
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
            </select>
          </label>
          <label>
            Location:*
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Images:
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
            {formData.images.length > 0 && (
              <div>
                <h3>Existing Images:</h3>
                <div className="existing-images">
                  {formData.images.map((image, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                      key={index}
                      src={
                        typeof image === "string"
                          ? image
                          : URL.createObjectURL(image)
                      }
                      alt={`Image ${index + 1}`}
                      width="100"
                    />
                  ))}
                </div>
              </div>
            )}
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
