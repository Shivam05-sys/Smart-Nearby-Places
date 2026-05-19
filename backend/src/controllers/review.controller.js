import Place from "../models/Place.js";
import Review from "../models/Review.js";

async function recalcRating(placeId) {
  const reviews = await Review.find({ place: placeId });
  const count = reviews.length;

  if (count === 0) {
    await Place.findByIdAndUpdate(placeId, { ratingAvg: 4.2, ratingCount: 0 });
    return;
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = Number((sum / count).toFixed(2));

  await Place.findByIdAndUpdate(placeId, { ratingAvg: avg, ratingCount: count });
}

export const addReview = async (req, res) => {
  const { placeId, userName, rating, comment } = req.body;

  if (!placeId || !userName || !rating) {
    return res.status(400).json({ message: "placeId, userName, rating required" });
  }

  const place = await Place.findById(placeId);
  if (!place) return res.status(404).json({ message: "Place not found" });

  const created = await Review.create({
    place: placeId,
    userName,
    rating,
    comment: comment || ""
  });

  await recalcRating(placeId);

  res.status(201).json(created);
};

export const getReviewsByPlace = async (req, res) => {
  const { placeId } = req.params;
  const reviews = await Review.find({ place: placeId }).sort({ createdAt: -1 });
  res.json(reviews);
};
