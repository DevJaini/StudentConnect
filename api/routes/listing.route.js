import express from "express";
import { authenticate } from "../middleware/jwt.middleware.js";
import {
  addListing,
  viewListings,
  dashboardViewListings,
  updateListing,
} from "../controllers/listing.controller.js";
import { validateListing } from "../validations/listing.validation.js";
import { uploadService, uploadToSupabase } from "../services/multer.service.js";

const router = express.Router();

router.post("/add", authenticate, async (req, res, next) => {
  // Use upload service to handle image file upload
  uploadService("images")(req, res, async () => {
    try {
      // Upload the images to Supabase and get the public URLs
      const fileUrls = await uploadToSupabase(req.files);
      // Attach the uploaded file URLs to the request body for further use
      req.body.images = fileUrls;

      // Proceed with the Joi validation for the rest of the request data
      validateListing(req, res, async () => {
        try {
          // After validation, call the addListing controller to add the listing to the database
          await addListing(req, res); // Add the listing using the controller
        } catch (addError) {
          return res.status(500).json({ error: addError.message });
        }
      });
    } catch (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }
  });
});

router.post("/view", authenticate, viewListings);

router.get("/dashboardView", dashboardViewListings);

router.put(
  "/update",
  authenticate,
  async (req, res, next) => {
    uploadService("updatedImages")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      try {
        let fileUrls = [];
        if (req.body.images) {
          req.body.images = JSON.parse(req.body.images); // Converts JSON string back to an array
        }
        // Upload files if provided
        if (req.files && req.files.length > 0) {
          fileUrls = await uploadToSupabase(req.files);
          // Check if `images` already exists and is an array
          if (Array.isArray(req.body.images)) {
            // Append new `fileUrls` to the existing array
            req.body.images = [...req.body.images, ...fileUrls];
          }
        }

        // Delegate to the updateListing controller
        next();
      } catch (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }
    });
  },
  updateListing
);

export default router;
