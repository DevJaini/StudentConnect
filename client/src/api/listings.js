import apiRequest from "./apiService";

// Add a new listing
export const addListing = async (data) => {
  return await apiRequest("POST", "/listing/add", data);
};

// View a single listing by ID
export const viewListing = async (id) => {
  return await apiRequest("GET", `/listing/view/${id}`);
};

// View a single listing by userId
export const viewUserListings = async (userId) => {
  return await apiRequest("GET", `/listing/viewUser/${userId}`);
};

// View all listings
export const viewAllListings = async () => {
  return await apiRequest("GET", "/listing/viewAll");
};

// Update an existing listing by ID
export const updateListing = async (id, data) => {
  return await apiRequest("PUT", `/listing/update/${id}`, data);
};

// Archive (delete) a listing by ID
export const archiveListing = async (id) => {
  return await apiRequest("DELETE", `/listing/archive/${id}`);
};
