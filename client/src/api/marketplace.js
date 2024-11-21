import apiRequest from "./apiService";

// Add a new marketplace item
export const addMarketplaceItem = async (data) => {
  return await apiRequest("POST", "/marketplace/add", data);
};

// View a single marketplace item by ID
export const viewMarketplaceItem = async (id) => {
  return await apiRequest("GET", `/marketplace/view/${id}`);
};

// View all marketplace items for a specific user
export const viewUserMarketplaceItems = async (userId) => {
  return await apiRequest("GET", `/marketplace/viewUser/${userId}`);
};

// View all marketplace items
export const viewAllMarketplaceItems = async () => {
  return await apiRequest("GET", "/marketplace/viewAll");
};

// Update an existing marketplace item by ID
export const updateMarketplaceItem = async (id, data) => {
  return await apiRequest("PUT", `/marketplace/update/${id}`, data);
};

// Archive (delete) a marketplace item by ID
export const archiveMarketplaceItem = async (id) => {
  return await apiRequest("DELETE", `/marketplace/archive/${id}`);
};
