import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/error.middleware.js";

import authRoutes from "./src/routes/auth.routes.js";
import placeRoutes from "./src/routes/place.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import recommendRoutes from "./src/routes/recommend.routes.js";
import googleRoutes from "./src/routes/google.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.send("✅ Smart Nearby Places Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/google", googleRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`)))
  .catch((err) => console.error("DB error:", err));
