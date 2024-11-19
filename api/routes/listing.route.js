import express from "express";
import { authenticate } from "../middleware/jwt.middleware.js";
import {
  addListing,
  viewListing,
  viewAllListings,
  updateListing,
  archiveListing,
  viewUserListings,
} from "../controllers/listing.controller.js";
import { validateListing } from "../validations/listing.middleware.js";
import { uploadService, uploadToSupabase } from "../services/multer.service.js";

const router = express.Router();

// router.post("/add", authenticate, validateListing, addListing);

// POST /create-listing route with authentication and file upload
router.post("/add", authenticate, async (req, res, next) => {
  // Use upload service to handle image file upload
  uploadService("images")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      // Check if files are present in the request
      if (!req.files || req.files.length === 0) {
        return res
          .status(400)
          .json({ error: "At least one image is required." });
      }

      // Upload the images to Supabase and get the public URLs
      const fileUrls = await uploadToSupabase(req.files);
      console.log(fileUrls);
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

router.get("/view/:id", authenticate, viewListing);
router.get("/viewAll", viewAllListings);
router.get("/view/:userId", authenticate, viewUserListings);
router.put("/update/:id", authenticate, updateListing);
router.delete("/archive/:id", authenticate, archiveListing);

export default router;
