import { supabase } from "../database/supabase.config.js";

// Add a new marketplace item
export const addMarketplaceItem = async (req, res) => {
  try {
    console.log("Entering:", req.body);

    const { data, error } = await supabase.from("marketplace").insert(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      success: true,
      message: "Marketplace item added successfully!",
      data,
    });
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ error: "Server error", err });
  }
};

export const dashboardViewMarketplaceItems = async (req, res) => {
  try {
    console.log("view received:");
    // Execute the query
    const { data, error } = await supabase
      .from("marketplace")
      .select("*")
      .eq("archived", false);

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(400).json({ error: error.message });
    }

    // Return the data
    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", err });
  }
};

export const viewMarketplaceItems = async (req, res) => {
  try {
    // Initialize the query
    let query = supabase.from("marketplace").select("*").eq("archived", false);

    // Apply price filters separately
    if (filters.price_min) {
      query = query.gte("price", filters.price_min); // Greater than or equal
      delete filters.price_min; // Remove price_min from the filters
    }
    if (filters.price_max) {
      query = query.lte("price", filters.price_max); // Less than or equal
      delete filters.price_max; // Remove price_max from the filters
    }

    // Dynamically apply filters only if provided
    if (filters && Object.keys(filters).length > 0) {
      for (const key in filters) {
        query = query.eq(key, filters[key]);
      }
    }

    // Execute the query
    const { data, error } = await query;

    if (error) {
      console.error("Supabase query error:", error);
      return res.status(400).json({ error: error.message });
    }

    // Return the data
    return res.status(200).json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error", err });
  }
};

export const updateMarketplaceItem = async (req, res) => {
  const updates = req.body;
  const { id } = req.body;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Marketplace item Id is required!" });
    }

    console.log("update data", updates);

    const { data, error } = await supabase
      .from("marketplace")
      .update(updates)
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};
