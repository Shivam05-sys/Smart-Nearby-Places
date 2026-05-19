import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import ReviewForm from "../components/ReviewForm";
import ReviewsList from "../components/ReviewsList";
import MapPreview from "../components/MapPreview";

export default function PlaceDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [distance, setDistance] = useState(null);

  const loadDetails = async () => {
    const res = await api.get(`/places/${id}`);
    setData(res.data);

    // ✅ calculate distance if user location + place coordinates exist
    try {
      const place = res.data?.place;
      if (place?.coordinates?.lat && place?.coordinates?.lng) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            // ask backend to calculate distance via list endpoint
            const resp = await api.get(
              `/places?lat=${latitude}&lng=${longitude}&search=${encodeURIComponent(
                place.name
              )}`
            );
            const matched = resp.data?.find((x) => x._id === place._id);
            if (matched?.distanceKm != null) setDistance(matched.distanceKm);
          },
          () => {} // ignore if location denied
        );
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, [id]);

  if (!data) return <div className="p-10 text-center font-bold">Loading...</div>;

  const p = data.place;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* ✅ Image */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-900">
        <img
          src={p.image || "https://via.placeholder.com/1200x600?text=No+Image"}
          alt={p.name}
          className="w-full h-[320px] md:h-[420px] object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1200x600?text=Image+Not+Found";
          }}
        />
      </div>

      {/* ✅ Title */}
      <div className="mt-6">
        <h1 className="text-3xl md:text-4xl font-black">{p.name}</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2 text-lg">
          📍 {p.location}
        </p>

        {typeof distance === "number" && (
          <p className="mt-2 text-indigo-600 font-bold">
            🚗 {distance} km away from you
          </p>
        )}
      </div>

      {/* ✅ Info Cards */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard label="Timing" value={p.timing || "Not Available"} />
        <InfoCard
          label="Rating"
          value={`${p.ratingAvg || 0} ⭐ (${p.ratingCount || 0})`}
        />
        <InfoCard label="Ticket" value={p.ticketPrice || "Free"} />
        <InfoCard label="Best Time" value={p.bestTimeToVisit || "Anytime"} />
      </div>

      {/* ✅ Description */}
      <div className="mt-6 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h2 className="text-xl font-black mb-2">About</h2>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
          {p.description}
        </p>
      </div>

      {/* ✅ Map */}
      <MapPreview link={p.mapLink} />

      {/* ✅ Reviews */}
      <ReviewForm placeId={id} onSuccess={loadDetails} />
      <ReviewsList reviews={data.reviews} />
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="font-black mt-1">{value}</div>
    </div>
  );
}
