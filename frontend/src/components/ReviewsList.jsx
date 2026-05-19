import React from "react";

export default function ReviewsList({ reviews = [] }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-black mb-3">⭐ Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-slate-500">No reviews yet. Be the first one!</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className="font-bold">{r.userName}</div>
                <div className="text-yellow-500 font-extrabold">
                  {"⭐".repeat(r.rating)}
                </div>
              </div>
              {r.comment && (
                <p className="mt-2 text-slate-700 dark:text-slate-200">
                  {r.comment}
                </p>
              )}
              <div className="text-xs mt-2 text-slate-400">
                {new Date(r.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
