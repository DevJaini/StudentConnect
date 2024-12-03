import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../api/user"; // Import your common axios functions
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext"; // Import useUser context hook
import "./profile.css";

const Profile = () => {
  const { user, setUser } = useUser(); // Access user info from context and setUser to update context
  const [name, setName] = useState(user?.username || ""); // Username state, initialized with user.username
  const [email, setEmail] = useState(user?.email || ""); // Email state
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
  const navigate = useNavigate();

  // Fetch user profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getProfile({ id: user.id }); // Call your common getProfile function
        setName(userProfile[0].username || ""); // Set name
        setEmail(userProfile[0].email || ""); // Set email
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (!user) {
      fetchProfile(); // Fetch only if there’s no user info in context
    }
  }, [user]); // Empty dependency array ensures this runs only once when the component mounts

  // Handle save changes
  const handleSave = async () => {
    try {
      // Call the API function to update the profile
      await updateProfile({ username: name });

      // Update the user context with the new name (assuming you have setUser function)
      setUser((prevUser) => ({
        ...prevUser,
        username: name, // Update the username
      }));

      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Handle reset password redirect
  const handleResetPassword = () => {
    navigate("/resetPassword"); // Redirect to reset password page
  };

  return (
    <div className="profile-container">
      {/* Username */}
      <div className="profile-info">
        <strong>Username:</strong>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <p>{name}</p>
        )}
      </div>

      {/* Email */}
      <div className="profile-info">
        <strong>Email:</strong> <p>{email}</p>
      </div>

      {/* Edit Button */}
      <div className="profile-actions">
        {isEditing ? (
          <button className="btn" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="btn" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>

      {/* Reset Password Button */}
      <div className="profile-actions">
        <button className="btn" onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
