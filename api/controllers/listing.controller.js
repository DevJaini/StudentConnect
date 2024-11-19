import { supabase } from "../database/supabase.config.js";

export const addListing = async (req, res) => {
  try {
    console.log("entering:", req.body);
    console.log("image", req.files);

    // Initialize an array to hold image URLs
    let imageUrls = [];

    for (const file of req.files) {
      const { originalname, buffer } = file; // Multer stores the file as a buffer

      // Generate a unique filename for each image
      const fileName = `${Date.now()}-${originalname}`;

      // Upload the image to Supabase storage
      const { data, error } = await supabase.storage
        .from("listing-images") // Ensure this is the correct bucket
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

    // Now insert the listing data into the database, including the image URLs
    const listingData = { ...req.body, images: imageUrls };

    const { data, error } = await supabase
      .from("listings")
      .insert([listingData]);

    if (error) {
      console.log("Database insert error:", error);
      return res.status(400).json({ error: error.message });
    }

    // Respond with success message
    res
      .status(200)
      .json({ success: true, message: "Listing added successfully!", data });
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ error: "Server error", err });
  }
};
export const viewListing = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "Listing Id is required!" });
    }

    // Fetching the listing from the database
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single(); // Use single() since you're fetching one record

    // Check for error in fetching data
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // If images exist, create image URLs
    // if (data && data.images) {
    //   data.imageUrl = supabase.storage
    //     .from("listing-images")
    //     .getPublicUrl(data.images).publicUrl; // Assuming images is a single string or an array
    // }

    // Return the data after processing
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error", err });
  }
};

export const viewAllListings = async (req, res) => {
  try {
    const { data, error } = await supabase.from("listings").select("*");

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);

    return data.map((listing) => {
      if (listing.images) {
        listing.imageUrl = supabase.storage
          .from("listing-images")
          .getPublicUrl(listing.images).publicUrl;
      }
      return listing;
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

export const viewUserListings = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "User Id is required!" });
    }

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return data.map((listing) => {
      if (listing.images) {
        listing.imageUrl = supabase.storage
          .from("listing-images")
          .getPublicUrl(listing.images).publicUrl;
      }
      return listing;
    });

    // return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

export const updateListing = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "Listing Id is required!" });
    }

    const { data, error } = await supabase
      .from("listings")
      .update(updates)
      .eq("id", id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

export const archiveListing = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "Listing Id is required!" });
    }
    const { data, error } = await supabase
      .from("listings")
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
