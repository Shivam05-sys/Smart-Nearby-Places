export function haversineKm(lat1, lon1, lat2, lon2) {
  if (
    lat1 === null || lon1 === null || lat2 === null || lon2 === null ||
    typeof lat1 !== "number" || typeof lon1 !== "number" ||
    typeof lat2 !== "number" || typeof lon2 !== "number"
  ) return null;

  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}
