import fetch from "node-fetch";

const BASE = "https://maps.googleapis.com/maps/api/place";

export async function googleTextSearch({ query }) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const url = `${BASE}/textsearch/json?query=${encodeURIComponent(query)}&key=${key}`;
  const res = await fetch(url);
  return res.json();
}

export async function googlePlaceDetails({ placeId }) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const fields = [
    "place_id",
    "name",
    "formatted_address",
    "geometry",
    "rating",
    "opening_hours",
    "photos",
    "url",
    "types"
  ].join(",");

  const url = `${BASE}/details/json?place_id=${placeId}&fields=${fields}&key=${key}`;
  const res = await fetch(url);
  return res.json();
}

export function googlePhotoUrl(photoReference, maxWidth = 1200) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  return `${BASE}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${key}`;
}
