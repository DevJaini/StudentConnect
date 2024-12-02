import { supabase } from "../database/supabase.config.js";

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
    res.status(500).json({ error: "Server error", err });
  }
};

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
    res.status(500).json({ error: "Server error", err });
  }
};

export const viewMarketplaceItems = async (req, res) => {
  try {
    const input = req.body;

    // Initialize the query
    let query = supabase.from("marketplace").select("*").eq("archived", false);

    // Remove keys with empty string values from filters object
    const filters = Object.fromEntries(
      Object.entries(input).filter(
        ([key, value]) => value !== "" && value !== null && value !== undefined
      )
    );
    if (filters.priceMin) {
      filters.priceMin = parseFloat(filters.priceMin); // Convert to number
      query = query.gte("price", filters.priceMin);
      delete filters.priceMin;
    }

    if (filters.priceMax) {
      filters.priceMax = parseFloat(filters.priceMax); // Convert to number
      query = query.lte("price", filters.priceMax);

      delete filters.priceMax;
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
      return res.status(400).json({ error: error.message });
    }

    // Return the data
    return res.status(200).json(data);
  } catch (err) {
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

    const { error } = await supabase
      .from("marketplace")
      .update(updates)
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};
