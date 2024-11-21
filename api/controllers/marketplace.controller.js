import { supabase } from "../database/supabase.config.js";

// Add a new marketplace item
export const addMarketplaceItem = async (req, res) => {
  try {
    console.log("Entering:", req.body);
    console.log("Images:", req.files);

    // Initialize an array to hold image URLs
    let imageUrls = [];

    for (const file of req.files) {
      const { originalname, buffer } = file;

      // Generate a unique filename for each image
      const fileName = `${Date.now()}-${originalname}`;

      // Upload the image to Supabase storage
      const { data, error } = await supabase.storage
        .from(" ") // Ensure this is the correct bucket
        .upload(`uploads/${fileName}`, buffer, {
          contentType: file.mimetype,
        });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // Store the uploaded image URL
      const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

      imageUrls.push(imageUrl);
    }

    // Insert marketplace data into the database
    const marketplaceData = { ...req.body, images: imageUrls };

    const { data, error } = await supabase
      .from("marketplace")
      .insert([marketplaceData]);

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

// View a single marketplace item by ID
export const viewMarketplaceItem = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Marketplace item ID is required!" });
    }

    const { data, error } = await supabase
      .from("marketplace")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

// View all marketplace items
export const viewAllMarketplaceItems = async (req, res) => {
  try {
    const { data, error } = await supabase.from("marketplace").select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

// View all marketplace items for a specific user
export const viewUserMarketplaceItems = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User ID is required!" });
    }

    const { data, error } = await supabase
      .from("marketplace")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

// Update an existing marketplace item
export const updateMarketplaceItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Marketplace item ID is required!" });
    }

    const { data, error } = await supabase
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

// Archive (delete) a marketplace item
export const archiveMarketplaceItem = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ error: "Marketplace item ID is required!" });
    }

    const { data, error } = await supabase
      .from("marketplace")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};
