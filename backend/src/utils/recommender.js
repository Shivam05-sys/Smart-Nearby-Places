/**
 * Smart Score = mood match + rating + distance
 * Higher score => better recommendation
 *
 * - Rating weight: 60%
 * - Distance weight: 40% (nearer is better)
 */
export function computeScore({ ratingAvg, distanceKm }) {
  const rating = Math.min(Math.max(ratingAvg || 0, 0), 5);

  // rating normalized 0..1
  const ratingScore = rating / 5;

  // distance normalized: 0..1
  // <=2km best; >=30km worst
  let distanceScore = 0.2;
  if (typeof distanceKm === "number") {
    if (distanceKm <= 2) distanceScore = 1;
    else if (distanceKm >= 30) distanceScore = 0.1;
    else distanceScore = 1 - (distanceKm - 2) / (30 - 2); // linear
  }

  return Number((0.6 * ratingScore + 0.4 * distanceScore).toFixed(4));
}
