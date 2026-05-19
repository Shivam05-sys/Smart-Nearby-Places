import Place from "../models/Place.js";
import Review from "../models/Review.js";
import { haversineKm } from "../utils/distance.js";

// Public: list places with optional category/search/nearby
export const listPlaces = async (req, res) => {
  const { category, search, lat, lng, maxKm } = req.query;

  const query = {};
  if (category) {
    query.category = { $regex: `^${category}$`, $options: "i" };
  }

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const places = await Place.find(query).sort({ createdAt: -1 });

  // if user location given -> attach distance
  const userLat = lat ? Number(lat) : null;
  const userLng = lng ? Number(lng) : null;
  const maxDistance = maxKm ? Number(maxKm) : null;

  let output = places.map((p) => {
    const d =
      userLat !== null && userLng !== null && p.coordinates?.lat != null && p.coordinates?.lng != null
        ? haversineKm(userLat, userLng, p.coordinates.lat, p.coordinates.lng)
        : null;

    return { ...p.toObject(), distanceKm: d };
  });

  if (maxDistance && !Number.isNaN(maxDistance)) {
    output = output.filter((p) => typeof p.distanceKm === "number" && p.distanceKm <= maxDistance);
  }

  // sort nearby first if distances exist
  if (userLat !== null && userLng !== null) {
    output.sort((a, b) => (a.distanceKm ?? 99999) - (b.distanceKm ?? 99999));
  }

  res.json(output);
};

// Public: place detail + reviews
export const getPlace = async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) return res.status(404).json({ message: "Place not found" });

  const reviews = await Review.find({ place: place._id }).sort({ createdAt: -1 });
  res.json({ place, reviews });
};

// Admin: create place
export const createPlace = async (req, res) => {
  const created = await Place.create(req.body);
  res.status(201).json(created);
};

// Admin: update place
export const updatePlace = async (req, res) => {
  const updated = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Place not found" });
  res.json(updated);
};

// Admin: delete place (also delete reviews)
export const deletePlace = async (req, res) => {
  const place = await Place.findById(req.params.id);
  if (!place) return res.status(404).json({ message: "Place not found" });

  await Review.deleteMany({ place: place._id });
  await Place.findByIdAndDelete(place._id);

  res.json({ message: "✅ Deleted place & its reviews" });
};
