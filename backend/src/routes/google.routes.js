import express from "express";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import { googleSearch, importGooglePlace } from "../controllers/google.controller.js";

const router = express.Router();

// Search public/admin
router.get("/search", googleSearch);

// Import admin-only
router.post("/import", verifyAdmin, importGooglePlace);

export default router;
