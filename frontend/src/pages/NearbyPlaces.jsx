import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function NearbyPlaces() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      api
        .get(`/places?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&maxKm=25`)
        .then((res) => setPlaces(res.data));
    });
  }, []);

  return (
    <div className="p-8">
      {places.map((p) => (
        <div key={p._id} className="border p-4 mb-3 rounded">
          {p.name} — {p.distanceKm} km
        </div>
      ))}
    </div>
  );
}
