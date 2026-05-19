import { useNavigate } from "react-router-dom";

const moods = [
  {
    label: "Cafes",
    value: "cafes",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
  },
  {
    label: "Temples",
    value: "temples",
    image:
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e"
  },
  {
    label: "Colleges",
    value: "colleges",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    label: "Treks",
    value: "treks",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  },
  {
    label: "Waterfalls",
    value: "waterfalls",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9"
  },
  {
    label: "Parks",
    value: "parks",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  }
];

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-black mb-8 text-center">
        Discover Places by Mood ✨
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {moods.map((m) => (
          <div
            key={m.value}
            onClick={() => nav(`/mood/${m.value}`)}
            className="relative h-44 md:h-52 rounded-3xl overflow-hidden cursor-pointer group shadow-lg"
          >
            {/* Background Image */}
            <img
              src={m.image}
              alt={m.label}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition"></div>

            {/* Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-2xl md:text-3xl font-black tracking-wide">
                {m.label.toUpperCase()}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
