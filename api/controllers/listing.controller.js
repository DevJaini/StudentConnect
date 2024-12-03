import { supabase } from "../database/supabase.config.js";

// Add a new listing to the "listings" table
export const addListing = async (req, res) => {
  try {
    const { data, error } = await supabase.from("listings").insert(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      success: true,
      message: "Listing added successfully!",
      data,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Retrieve all active (not archived) listings for the dashboard
export const dashboardViewListings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("archived", false);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Retrieve listings with dynamic filtering
export const viewListings = async (req, res) => {
  try {
    const input = req.body;

    let query = supabase.from("listings").select("*").eq("archived", false);

    // Filter out empty, null, or undefined inputs
    const filters = Object.fromEntries(
      Object.entries(input).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    // Apply range filters for price
    if (filters.priceMin) {
      query = query.gte("price", parseFloat(filters.priceMin));
      delete filters.priceMin;
    }
    if (filters.priceMax) {
      query = query.lte("price", parseFloat(filters.priceMax));
      delete filters.priceMax;
    }

    // Dynamically apply other filters
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Update an existing listing by its ID
export const updateListing = async (req, res) => {
  const updates = req.body;
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "Listing ID is required!" });
    }

    const { error } = await supabase
      .from("listings")
      .update(updates)
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res
      .status(200)
      .json({ success: true, message: "Listing updated successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
