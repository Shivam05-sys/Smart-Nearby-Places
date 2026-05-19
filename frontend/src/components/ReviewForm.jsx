import React, { useState } from "react";
import { api } from "../api/api";

export default function ReviewForm({ placeId, onSuccess }) {
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitReview = async () => {
    if (!userName.trim()) return alert("Please enter your name");
    if (!placeId) return alert("Place not found");

    try {
      setLoading(true);
      await api.post("/reviews", {
        placeId,
        userName,
        rating,
        comment
      });

      setUserName("");
      setRating(5);
      setComment("");

      if (onSuccess) onSuccess();
      alert("✅ Review submitted!");
    } catch (e) {
      alert(e.response?.data?.message || "❌ Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 p-5 rounded-2xl border border-slate-300 dark:border-slate-700">
      <h2 className="text-xl font-black mb-3">📝 Add Your Review</h2>

      <div className="grid gap-3">
        <input
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <select
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <textarea
          className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 min-h-[90px]"
          placeholder="Write your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitReview}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
