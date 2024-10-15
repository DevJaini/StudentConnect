import axios from "axios";
import { supabase } from "../supabase/supabaseClient";

const API_URL = "http://localhost:8800/api"; // Base URL for your API

// Function to handle API requests dynamically
const apiRequest = async (method, endpoint, data = null) => {
  try {
    let response;

    // Choose between Supabase and your own API
    if (endpoint.startsWith("/auth/")) {
      // Supabase authentication
      response = await supabase.auth.api[method](endpoint, data);
    } else {
      // Custom API calls
      response = await axios({
        method,
        url: `${API_URL}${endpoint}`,
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return response.data; // Return the response data
  } catch (error) {
    // Handle error globally
    throw error.response?.data || { error: "Something went wrong!" };
  }
};

export default apiRequest;
