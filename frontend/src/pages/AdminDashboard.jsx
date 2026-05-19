import { useEffect, useState } from "react";
import { adminApi } from "../api/api";

const emptyForm = {
  name: "",
  category: "temples",
  location: "",
  description: "",
  timing: "",
  ticketPrice: "",
  bestTimeToVisit: "",
  mapLink: "",
  image: "",
  ratingAvg: 4.2,
  coordinates: { lat: "", lng: "" }
};

export default function AdminDashboard() {
  const api = adminApi();
  const [places, setPlaces] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ 1. PROTECT ADMIN ROUTE
  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      window.location.href = "/admin";
    }
  }, []);

  const loadPlaces = async () => {
    try {
      const res = await api.get("/places");
      setPlaces(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      console.error(e);
      setPlaces([]);
    }

  };

  useEffect(() => {
    loadPlaces();
  }, []);

  // ✅ 2. SAFE SAVE HANDLER
  const handleSave = async () => {
    if (!form.name || !form.location || !form.description) {
      return alert("⚠️ Please fill Name, Location and Description");
    }

    setLoading(true);

    const payload = {
      ...form,
      coordinates:
        form.coordinates.lat && form.coordinates.lng
          ? {
              lat: Number(form.coordinates.lat),
              lng: Number(form.coordinates.lng)
            }
          : undefined
    };

    try {
      if (editId) {
        await api.put(`/places/${editId}`, payload);
        alert("✅ Place Updated!");
      } else {
        await api.post("/places", payload);
        alert("✅ Place Added!");
      }

      setForm(emptyForm);
      setEditId(null);
      loadPlaces();
    } catch (e) {
      console.error(e);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({
      ...p,
      coordinates: {
        lat: p.coordinates?.lat ?? "",
        lng: p.coordinates?.lng ?? ""
      }
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this place?")) return;
    await api.delete(`/places/${id}`);
    alert("✅ Deleted!");
    loadPlaces();
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-black">Admin Dashboard</h1>
      <p className="text-slate-600 dark:text-slate-300 mt-2">
        Add / Update / Delete places anytime.
      </p>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {/* ✅ FORM */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h2 className="text-xl font-black mb-4">
            {editId ? "Update Place" : "Add New Place"}
          </h2>

          <div className="grid gap-3">
            <input
              className="inp"
              placeholder="Place Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <select
              className="inp"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="cafes">cafes</option>
              <option value="temples">temples</option>
              <option value="colleges">colleges</option>
              <option value="treks">treks</option>
              <option value="waterfalls">waterfalls</option>
              <option value="parks">parks</option>
              <option value="lakes">lakes</option>
            </select>

            <input
              className="inp"
              placeholder="Location *"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <input
              className="inp"
              placeholder="Timing"
              value={form.timing}
              onChange={(e) => setForm({ ...form, timing: e.target.value })}
            />

            <input
              className="inp"
              placeholder="Ticket Price"
              value={form.ticketPrice}
              onChange={(e) => setForm({ ...form, ticketPrice: e.target.value })}
            />

            <input
              className="inp"
              placeholder="Best Time To Visit"
              value={form.bestTimeToVisit}
              onChange={(e) => setForm({ ...form, bestTimeToVisit: e.target.value })}
            />

            <input
              className="inp"
              placeholder="Google Maps Link"
              value={form.mapLink}
              onChange={(e) => setForm({ ...form, mapLink: e.target.value })}
            />

            <input
              className="inp"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                className="inp"
                placeholder="Latitude"
                value={form.coordinates.lat}
                onChange={(e) =>
                  setForm({
                    ...form,
                    coordinates: { ...form.coordinates, lat: e.target.value }
                  })
                }
              />
              <input
                className="inp"
                placeholder="Longitude"
                value={form.coordinates.lng}
                onChange={(e) =>
                  setForm({
                    ...form,
                    coordinates: { ...form.coordinates, lng: e.target.value }
                  })
                }
              />
            </div>

            <textarea
              className="inp min-h-[110px]"
              placeholder="Description *"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            {/* ✅ 3. LOADING STATE */}
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              {loading ? "Saving..." : editId ? "Update Place" : "Add Place"}
            </button>

            {editId && (
              <button
                onClick={() => {
                  setEditId(null);
                  setForm(emptyForm);
                }}
                className="px-4 py-3 rounded-xl border font-bold"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        {/* PLACES LIST */}
        <div className="p-6 rounded-2xl border bg-white dark:bg-slate-900">
          <h2 className="text-xl font-black mb-4">All Places</h2>
          <div className="space-y-3 max-h-[600px] overflow-auto pr-2">
            {Array.isArray(places) && places.map((p) => (
              <div key={p._id} className="p-4 rounded-xl border">
                <div className="font-black">{p.name}</div>
                <div className="text-sm text-slate-500">
                  {p.category} • {p.location}
                </div>
                <div className="text-sm">⏰ {p.timing || "Not Available"}</div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-2 rounded-lg bg-yellow-500 text-white font-bold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-2 rounded-lg bg-red-600 text-white font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {places.length === 0 && (
              <div className="text-slate-500">No places added yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
