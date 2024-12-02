import { supabase } from "../database/supabase.config.js";

export const addListing = async (req, res) => {
  try {
    console.log("entering:", req.body);

    // // Initialize an array to hold image URLs
    // let imageUrls = [];

    // for (const file of req.files) {
    //   const { originalname, buffer } = file; // Multer stores the file as a buffer

    //   // Generate a unique filename for each image
    //   const fileName = `${Date.now()}-${originalname}`;

    //   // Upload the image to Supabase storage
    //   const { data, error } = await supabase.storage
    //     .from("listing-images") // Ensure this is the correct bucket
    //     .upload(`uploads/${fileName}`, buffer, {
    //       contentType: file.mimetype,
    //     });

    //   if (error) {
    //     return res.status(500).json({ error: error.message });
    //   }

    //   // Store the uploaded image URL
    //   const imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;

    //   imageUrls.push(imageUrl);
    // }

    // Now insert the listing data into the database, including the image URLs
    // const listingData = { ...req.body, images: imageUrls };

    const { data, error } = await supabase.from("listings").insert(req.body);

    if (error) {
      console.log("Database insert error:", error);
      return res.status(400).json({ error: error.message });
    }

    res
      .status(200)
      .json({ success: true, message: "Listing added successfully!", data });
  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ error: "Server error", err });
  }
};

// export const viewListing = async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (!id) {
//       return res.status(400).json({ error: "Listing Id is required!" });
//     }

//     // Fetching the listing from the database
//     const { data, error } = await supabase
//       .from("listings")
//       .select("*")
//       .eq("id", id)
//       .single(); // Use single() since you're fetching one record

//     // Check for error in fetching data
//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }

//     // If images exist, create image URLs
//     // if (data && data.images) {
//     //   data.imageUrl = supabase.storage
//     //     .from("listing-images")
//     //     .getPublicUrl(data.images).publicUrl; // Assuming images is a single string or an array
//     // }

//     // Return the data after processing
//     return res.status(200).json(data);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error", err });
//   }
// };

// export const viewAllListings = async (req, res) => {
//   try {
//     const { data, error } = await supabase.from("listings").select("*");

//     if (error) {
//       return res.status(400).json({ error: error.message });
//     }
//     return res.status(200).json(data);

//     // return data.map((listing) => {
//     //   if (listing.images) {
//     //     listing.imageUrl = supabase.storage
//     //       .from("listing-images")
//     //       .getPublicUrl(listing.images).publicUrl;
//     //   }
//     // return data;
//     // });
//   } catch (err) {
//     res.status(500).json({ error: "Server error", err });
//   }
// };

// export const viewUserListings = async (req, res) => {
//   const { userId } = req.params;
//   // req.user.userId

//   try {
//     console.log("---enter------", userId);
//     if (!userId) {
//       return res.status(400).json({ error: "User Id is required!" });
//     }
//     console.log("SWDErf", userId);
//     const { data, error } = await supabase
//       .from("listings")
//       .select("*")
//       .eq("user_id", userId);

//     if (error) {
//       console.log("ss", error);

//       return res.status(400).json({ error: error.message });
//     }
//     console.log("SWDErsdfghjf", data);

//     return res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Server error", err });
//   }
// };

export const dashboardViewListings = async (req, res) => {
  try {
    console.log("view received:");
    // Execute the query
    const { data, error } = await supabase
      .from("listings")
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

export const viewListings = async (req, res) => {
  try {
    const filters = req.body;
    console.log("filters", filters);

    // Initialize the query
    let query = supabase.from("listings").select("*").eq("archived", false);

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

export const updateListing = async (req, res) => {
  const updates = req.body;
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "Listing Id is required!" });
    }

    console.log("update data", updates);

    const { data, error } = await supabase
      .from("listings")
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
