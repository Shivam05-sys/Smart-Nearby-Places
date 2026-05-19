import express from "express";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
  listPlaces,
  getPlace,
  createPlace,
  updatePlace,
  deletePlace
} from "../controllers/place.controller.js";

const router = express.Router();

// Public
router.get("/", listPlaces);
router.get("/:id", getPlace);

// Admin CRUD
router.post("/", verifyAdmin, createPlace);
router.put("/:id", verifyAdmin, updatePlace);
router.delete("/:id", verifyAdmin, deletePlace);

export default router;
