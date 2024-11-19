import axios from "axios";
import { supabase } from "../supabase/supabaseClient";

const API_URL = "http://localhost:8800/api"; // Base URL for your API

// Function to handle API requests dynamically
const apiRequest = async (method, endpoint, data = null) => {
  try {
    let response;
    console.log(`request entered ${method} ${endpoint} ${data}`);

    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    console.log("12234", token);

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }), // Conditionally add token to headers
    };

    // If data is FormData, let Axios set the Content-Type automatically
    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    // Choose between Supabase and your own API
    if (endpoint.startsWith("/auth/")) {
      console.log("going to supabase");
      // Supabase authentication
      response = await supabase.auth.api[method](endpoint, data);
    } else {
      // Custom API calls
      console.log("my custom call", method, `${API_URL}${endpoint}`, data);
      response = await axios({
        method,
        url: `${API_URL}${endpoint}`,
        data,
        headers,
      });
    }
    console.log("ok");
    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    // Handle error globally
    console.error("API request error:", error);
    throw error.response?.data || { error: "Something went wrong!" };
  }
};

export default apiRequest;
