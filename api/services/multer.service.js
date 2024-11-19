// uploadService.js
import multer from "multer";
import path from "path";
import { supabase } from "../database/supabase.config.js";

// Set up multer storage configuration (we don't need to store files locally)
const storage = multer.memoryStorage(); // Store files in memory temporarily

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    ß;
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Common multer upload service
const uploadService = (fieldName, maxFiles = 5) => {
  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB max file size (adjust as needed)
      files: maxFiles, // Limit to `maxFiles` number of files
    },
  }).array(fieldName, maxFiles); // Upload multiple files if needed (use `.single()` for one file)
};

// Function to upload files to Supabase Storage
const uploadToSupabase = async (files) => {
  const bucketName = "listing-images"; // Specify your bucket name in Supabase

  const uploadPromises = files.map(async (file) => {
    const filePath = `uploads/${file.originalname}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        cacheControl: "3600",
        upsert: true, // Overwrite if file already exists
      });

    if (error) {
      throw new Error(error.message);
    }

    // Return the public URL of the uploaded file
    const { publicURL, error: publicUrlError } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (publicUrlError) {
      throw new Error(publicUrlError.message);
    }

    return publicURL;
  });

  // Return the array of public URLs for the uploaded files
  return Promise.all(uploadPromises);
};

export { uploadService, uploadToSupabase };
