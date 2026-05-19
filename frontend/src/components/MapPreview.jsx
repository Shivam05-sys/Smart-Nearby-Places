import React from "react";

export default function MapPreview({ link }) {
  if (!link) return null;

  // If link is normal google map URL, embed it in iframe
  const embedLink = link.includes("google.com/maps")
    ? link.replace("/maps?", "/maps/embed?") // basic conversion
    : link;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">📍 Map</h2>

      <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700">
        <iframe
          title="map"
          src={embedLink}
          width="100%"
          height="320"
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
      >
        Open in Google Maps
      </a>
    </div>
  );
}
