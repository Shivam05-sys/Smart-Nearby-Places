import { useEffect, useState } from "react";
import { getRecommendations } from "../api/recommendApi";

export default function Recommendations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      getRecommendations("temples", pos.coords.latitude, pos.coords.longitude)
        .then((res) => setItems(res.data));
    });
  }, []);

  return (
    <div className="p-8">
      {items.map((i) => (
        <div key={i._id} className="border p-4 mb-3 rounded">
          {i.name} ⭐ {i.ratingAvg} — Score {i.score}
        </div>
      ))}
    </div>
  );
}
