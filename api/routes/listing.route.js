import express from "express";
import {
  addListing,
  viewListings,
  viewAllListings,
  updateListing,
  archiveListing,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/add", addListing);
router.get("/view/:id", viewListings);
router.get("/view/all", viewAllListings);
router.put("/update/:id", updateListing);
router.delete("/archive/:id", archiveListing);

export default router;
