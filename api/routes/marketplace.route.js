import express from "express";
import { authenticate } from "../middleware/jwt.middleware.js";
import {
  addMarketplaceItem,
  viewMarketplaceItem,
  viewAllMarketplaceItems,
  updateMarketplaceItem,
  archiveMarketplaceItem,
  viewUserMarketplaceItems,
} from "../controllers/marketplace.controller.js";
import { uploadService, uploadToSupabase } from "../services/multer.service.js";

const router = express.Router();

// POST /add: Add a new marketplace item
router.post(
  "/add",
  authenticate,
  async (req, res) => {
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

        // Delegate to the updateMarketplaceItem controller
        next();
      } catch (uploadError) {
        return res.status(500).json({ error: uploadError.message });
      }
    });
  },
  addMarketplaceItem
);

// GET /view/:id: View a single marketplace item by ID
router.get("/view/:id", authenticate, viewMarketplaceItem);

// GET /viewAll: View all marketplace items
router.get("/viewAll", viewAllMarketplaceItems);

// GET /viewUser/:userId: View all marketplace items for a specific user
router.get("/viewUser/:userId", authenticate, viewUserMarketplaceItems);

// PUT /update/:id: Update an existing marketplace item
router.put(
  "/update/:id",
  authenticate,
  async (req, res, next) => {
    uploadService("images")(req, res, async (err) => {
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

// DELETE /archive/:id: Archive (soft-delete) a marketplace item
router.delete("/archive/:id", authenticate, archiveMarketplaceItem);

export default router;
