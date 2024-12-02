import apiRequest from "./apiService";

// Add a new marketplace item
export const addMarketplaceItem = async (data) => {
  return await apiRequest("POST", "/marketplace/add", data);
};

// View a single marketplace item by ID
export const viewMarketplaceItem = async (data) => {
  return await apiRequest("POST", "/marketplace/view", data);
};

// View all marketplace items
export const viewAllMarketplaceItems = async () => {
  return await apiRequest("GET", "/marketplace/dashboardView");
};

// Update an existing marketplace item by ID
export const updateMarketplaceItem = async (data) => {
  return await apiRequest("PUT", "/marketplace/update", data);
};
