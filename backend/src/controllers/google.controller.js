import Place from "../models/Place.js";
import { googleTextSearch, googlePlaceDetails, googlePhotoUrl } from "../utils/googlePlaces.js";

/**
 * Search Google places using text query (admin or public)
 * Example query: "temples near Pune"
 */
export const googleSearch = async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ message: "query required" });

  const data = await googleTextSearch({ query });

  if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
    return res.status(400).json({ message: "Google error", status: data.status, data });
  }

  res.json(data.results || []);
};

/**
 * Import a google place into DB
 * Admin picks a place_id and category (mood)
 */
export const importGooglePlace = async (req, res) => {
  const { placeId, category } = req.body;
  if (!placeId || !category) {
    return res.status(400).json({ message: "placeId and category required" });
  }

  const details = await googlePlaceDetails({ placeId });

  if (details.status !== "OK") {
    return res.status(400).json({ message: "Details fetch failed", status: details.status, details });
  }

  const d = details.result;

  // prevent duplicate imports
  const exists = await Place.findOne({ googlePlaceId: d.place_id });
  if (exists) return res.status(409).json({ message: "Already imported", place: exists });

  const photoRef = d.photos?.[0]?.photo_reference || "";
  const imageUrl = photoRef ? googlePhotoUrl(photoRef, 1200) : "";

  const timing =
    d.opening_hours?.weekday_text?.length
      ? d.opening_hours.weekday_text.join(" | ")
      : "Not Available";

  const mapLink = d.url || "";

  const created = await Place.create({
    name: d.name,
    category,
    location: d.formatted_address || "Not Available",
    description: `Imported from Google Places. Types: ${(d.types || []).slice(0, 5).join(", ")}`,
    timing,
    ticketPrice: "Varies",
    bestTimeToVisit: "Anytime",
    coordinates: {
      lat: d.geometry?.location?.lat ?? null,
      lng: d.geometry?.location?.lng ?? null
    },
    mapLink,
    mapEmbed: mapLink ? mapLink : "",
    image: imageUrl,
    googlePlaceId: d.place_id,
    ratingAvg: d.rating || 4.2,
    ratingCount: 0
  });

  res.status(201).json(created);
};
