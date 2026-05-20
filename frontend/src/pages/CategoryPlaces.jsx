import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function CategoryPlaces() {
  const { category } = useParams();

  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const loadPlaces = async () => {
    try {
      setLoading(true);
      setErr("");

      const res = await api.get(
        `/places?category=${category}&search=${encodeURIComponent(search)}`
      );

      setPlaces(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setErr(e.response?.data?.message || e.message || "Failed to load places");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces();
    // eslint-disable-next-line
  }, [category]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-bold">
        Loading {category}...
      </div>
    );
  }

  if (err) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-600 font-bold text-lg">❌ {err}</p>
        <p className="text-slate-500 mt-2">
          Check backend is running on <b>https://smart-nearby-places-axh0.onrender.com</b>
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* ✅ Title + Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black capitalize">{category}</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Explore best {category} with timing, rating and details.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            placeholder={`Search ${category}...`}
          />
          <button
            onClick={loadPlaces}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
          >
            Search
          </button>
        </div>
      </div>

      {/* ✅ No data */}
      {places.length === 0 ? (
        <div className="mt-10 text-center text-slate-500">
          No places found in <b>{category}</b>.
          <br />
          Add places from Admin Dashboard.
        </div>
      ) : (
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(places) && places.map((p) => (

            <Link
              key={p._id}
              to={`/place/${p._id}`}
              className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition bg-white dark:bg-slate-900"
            >
              {/* ✅ IMAGE */}
              
              <div className="h-44 bg-slate-200 dark:bg-slate-800">
                <img
                  src={p.image || "https://via.placeholder.com/800x500?text=No+Image"}
                  alt={p.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/800x500?text=Image+Not+Found";
                  }}
                />
              </div>

              {/* ✅ Content */}
              <div className="p-5">
                <h2 className="font-black text-lg">{p.name}</h2>
                <p className="text-sm text-slate-500">{p.location}</p>

                <div className="mt-3 text-sm space-y-1">
                  <p>⏰ {p.timing || "Not Available"}</p>
                  <p>
                    ⭐ {p.ratingAvg || 0}{" "}
                    <span className="text-slate-500">
                      ({p.ratingCount || 0} reviews)
                    </span>
                  </p>

                  {/* ✅ Distance (if available) */}
                  {typeof p.distanceKm === "number" && (
                    <p className="font-semibold text-indigo-600">
                      📍 {p.distanceKm} km away
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
