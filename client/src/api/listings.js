import apiRequest from "./apiService";

// Add a new listing
export const addListing = async (data) => {
  return await apiRequest("POST", "/listing/add", data);
};

// View a single listing by ID
export const viewListing = async (data) => {
  return await apiRequest("POST", "/listing/view", data);
};

// View all listings
export const viewAllListings = async () => {
  return await apiRequest("GET", "/listing/dashboardView");
};

// Update an existing listing by ID
export const updateListing = async (data) => {
  return await apiRequest("PUT", "/listing/update", data);
};
