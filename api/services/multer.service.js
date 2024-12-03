// uploadService.js
import multer from "multer";
import { supabase } from "../database/supabase.config.js";

// Set up multer storage configuration (we don't need to store files locally)
const storage = multer.memoryStorage(); // Store files in memory temporarily

// File filter for images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
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
  const bucketName = "studentconnect-images"; // Replace with your bucket name

  const uploadPromises = files.map(async (file) => {
    const { originalname, buffer, mimetype } = file; // Extract file details
    const fileName = `${Date.now()}-${originalname}`; // Generate unique file name

    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`uploads/${fileName}`, buffer, {
        contentType: mimetype,
      });

    if (error) {
      throw new Error(error.message); // Handle upload error
    }

    // Construct the public URL for the uploaded file
    return `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
  });

  // Return the array of public URLs for the uploaded files
  return Promise.all(uploadPromises);
};

export { uploadService, uploadToSupabase };
