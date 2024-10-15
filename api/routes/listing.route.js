import express from "express";
import { authenticate } from "../middleware/jwt.middleware.js";
import {
  addListing,
  viewListings,
  viewAllListings,
  updateListing,
  archiveListing,
} from "../controllers/listing.controller.js";
import { validateListing } from "../validations/listing.middleware.js";

const router = express.Router();

router.post("/add", authenticate, validateListing, addListing);
router.get("/view/:id", authenticate, viewListings);
router.get("/view/all", authenticate, viewAllListings);
router.put("/update/:id", authenticate, updateListing);
router.delete("/archive/:id", authenticate, archiveListing);

export default router;
