import axios from "axios";
import { supabase } from "../supabase/supabaseClient";

const API_URL = "http://localhost:8800/api"; // Base URL for your API

// Function to handle API requests dynamically
const apiRequest = async (method, endpoint, data = null) => {
  try {
    let response;
    console.log(`request entered ${method} ${endpoint} ${data}`);

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
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    console.log("ok");
    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    // Handle error globally
    throw error.response?.data || { error: "Something went wrong!" };
  }
};

export default apiRequest;
