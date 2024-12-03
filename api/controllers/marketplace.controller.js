import { supabase } from "../database/supabase.config.js";

// Add a new item to the marketplace
export const addMarketplaceItem = async (req, res) => {
  try {
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
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Retrieve all active (not archived) marketplace items for the dashboard
export const dashboardViewMarketplaceItems = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("marketplace")
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

// Retrieve marketplace items with dynamic filtering based on input
export const viewMarketplaceItems = async (req, res) => {
  try {
    const input = req.body;

    let query = supabase.from("marketplace").select("*").eq("archived", false);

    // Remove empty, null, or undefined keys from filters object
    const filters = Object.fromEntries(
      Object.entries(input).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    // Apply price range filters if provided
    if (filters.priceMin) {
      filters.priceMin = parseFloat(filters.priceMin); // Ensure it's a number
      query = query.gte("price", filters.priceMin);
      delete filters.priceMin;
    }

    if (filters.priceMax) {
      filters.priceMax = parseFloat(filters.priceMax); // Ensure it's a number
      query = query.lte("price", filters.priceMax);
      delete filters.priceMax;
    }

    // Apply other filters dynamically
    for (const [key, value] of Object.entries(filters)) {
      query = query.eq(key, value);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Update an existing marketplace item by its ID
export const updateMarketplaceItem = async (req, res) => {
  const updates = req.body;
  const { id } = req.body;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Marketplace item ID is required!" });
    }

    const { error } = await supabase
      .from("marketplace")
      .update(updates)
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      success: true,
      message: "Marketplace item updated successfully!",
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};
