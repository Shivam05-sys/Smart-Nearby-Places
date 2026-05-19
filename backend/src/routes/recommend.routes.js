import express from "express";
import { getRecommendations } from "../controllers/recommend.controller.js";

const router = express.Router();

// GET /api/recommend?mood=temples&lat=18.52&lng=73.85
router.get("/", getRecommendations);

export default router;
