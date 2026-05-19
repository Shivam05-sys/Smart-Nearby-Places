import Place from "../models/Place.js";
import { haversineKm } from "../utils/distance.js";
import { computeScore } from "../utils/recommender.js";

export const getRecommendations = async (req, res) => {
  const { mood, lat, lng } = req.query;

  if (!mood) return res.status(400).json({ message: "mood query required (category)" });

  const userLat = lat ? Number(lat) : null;
  const userLng = lng ? Number(lng) : null;

  // mood = category
  const places = await Place.find({ category: mood });

  const scored = places.map((p) => {
    const d =
      userLat != null &&
      userLng != null &&
      p.coordinates?.lat != null &&
      p.coordinates?.lng != null
        ? haversineKm(userLat, userLng, p.coordinates.lat, p.coordinates.lng)
        : null;

    const score = computeScore({ ratingAvg: p.ratingAvg, distanceKm: d });

    return {
      ...p.toObject(),
      distanceKm: d,
      score
    };
  });

  // sort by score desc then distance asc
  scored.sort((a, b) => (b.score - a.score) || ((a.distanceKm ?? 99999) - (b.distanceKm ?? 99999)));

  res.json(scored.slice(0, 30));
};
