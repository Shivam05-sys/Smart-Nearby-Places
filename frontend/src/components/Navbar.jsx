import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.theme = isDark ? "dark" : "light";
    setDark(isDark);
  };

  return (
    <div className="p-4 flex justify-between items-center border-b">
      <Link to="/" className="font-black text-xl">SmartNearby</Link>
      <div className="flex gap-3">
        <Link to="/nearby">Nearby</Link>
        <Link to="/recommend">Recommend</Link>
        <Link to="/admin">Admin</Link>
        <button onClick={toggle}>{dark ? "🌙" : "☀️"}</button>
      </div>
    </div>
  );
}
