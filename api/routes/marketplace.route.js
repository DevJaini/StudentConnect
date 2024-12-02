import express from "express";
import { authenticate } from "../middleware/jwt.middleware.js";
import {
  addMarketplaceItem,
  viewMarketplaceItems,
  dashboardViewMarketplaceItems,
  updateMarketplaceItem,
} from "../controllers/marketplace.controller.js";
import { uploadService, uploadToSupabase } from "../services/multer.service.js";
import { validateMarketplace } from "../validations/marketplace.middleware.js";

const router = express.Router();

router.post("/add", authenticate, async (req, res) => {
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

      // Attach the uploaded file URLs to the request body
      req.body.images = fileUrls;

      // Add the marketplace item using the controller
      validateMarketplace(req, res, async () => {
        try {
          // After validation, call the addListing controller to add the listing to the database
          await addMarketplaceItem(req, res); // Add the listing using the controller
        } catch (addError) {
          return res.status(500).json({ error: addError.message });
        }
      });
    } catch (uploadError) {
      return res.status(500).json({ error: uploadError.message });
    }
  });
});

router.post("/view", authenticate, viewMarketplaceItems);

router.get("/dashboardView", dashboardViewMarketplaceItems);

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
        // Upload files if provided
        if (req.files && req.files.length > 0) {
          fileUrls = await uploadToSupabase(req.files);
        }

        // Attach file URLs to the request body
        req.body.images = fileUrls;

        // Delegate to the updateMarketplaceItem controller
        next();
      } catch (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }
    });
  },
  updateMarketplaceItem
);

export default router;
