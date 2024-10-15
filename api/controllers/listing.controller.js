import { supabase } from "../config/supabase.config.js";

export const addListing = async (req, res) => {
  // const {
  //   location,
  //   title,
  //   description,
  //   price,
  //   school,
  //   type_of_house,
  //   facilities,
  //   images,
  //   offers,
  //   fees_policies,
  //   user_id,
  // } = req.body;

  try {
    const { data, error } = await supabase.from("listings").insert([req.body]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json({ message: "Listing added successful!", data });
  } catch (err) {
    res.status(500).json({ error: "Server error", err });
  }
};

export const viewListings = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "Listing Id is required!" });
    }

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
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
