import React, { useState, useEffect } from "react";
import { useUser } from "../../../context/userContext"; // Custom hook for user context
import { viewListing, updateListing } from "../../../api/listings"; // API methods
import { useNavigate, useParams } from "react-router-dom";
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
    images: [], // Field for existing and new images combined
    user_id: "",
  });
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // Access user data from the context
  const { id } = useParams(); // Access the listing ID from the URL params
  const navigate = useNavigate();

  // Fetch the existing listing data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listing = await viewListing(id); // Fetch listing data by ID
        setFormData({
          ...listing,
          images: listing.images || [], // Set existing images if available
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing:", error);
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
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...formData.images, ...files], // Append new images to existing ones
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true); // Set loading state to true while submitting

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        data.append(key, formData[key]); // Append all other form data
      }
    });

    // Append all images (existing + new) to the FormData object
    formData.images.forEach((image) => {
      data.append("images", image); // Append each image (URL or file)
    });

    console.log("w23er4tyu", data);

    // Ensure user_id is passed as a single value
    if (Array.isArray(data.user_id)) {
      data.append("user_id", user.id[0]); // Get the first ID if it's an array
    } else {
      data.append("user_id", user.id); // Otherwise, use the ID directly
    }

    try {
      const response = await updateListing(id, data); // Call the API to update the listing
      if (response.success) {
        alert("Property updated successfully!");
        navigate("/listings"); // Redirect to listings page after successful update
      } else {
        alert("Failed to update property. Please try again.");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      alert("Error updating property. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <div className="add-property-container">
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
            Update Property
          </button>
        </form>
      )}
    </div>
  );
};

export default EditListing;
