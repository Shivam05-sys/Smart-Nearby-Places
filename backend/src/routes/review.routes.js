import express from "express";
import { addReview, getReviewsByPlace } from "../controllers/review.controller.js";

const router = express.Router();

// Public add review
router.post("/", addReview);

// Public get reviews by place
router.get("/:placeId", getReviewsByPlace);

export default router;
