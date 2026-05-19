import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import Home from "./pages/Home.jsx";
import CategoryPlaces from "./pages/CategoryPlaces.jsx";
import PlaceDetails from "./pages/PlaceDetails.jsx";
import NearbyPlaces from "./pages/NearbyPlaces.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mood/:category" element={<CategoryPlaces />} />
        <Route path="/place/:id" element={<PlaceDetails />} />
        <Route path="/nearby" element={<NearbyPlaces />} />
        <Route path="/recommend" element={<Recommendations />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
