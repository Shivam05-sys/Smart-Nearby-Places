import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@smartnearby.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const login = async () => {
    try {
      setLoading(true);

      const res = await api.post("/api/auth/admin-login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      nav("/admin/dashboard");
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900">
      <div className="p-8 w-[350px] rounded-2xl bg-white">
        <h1 className="text-2xl font-bold mb-5 text-center">Admin Login</h1>

        <input
          className="w-full px-3 py-2 border rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="w-full px-3 py-2 border rounded mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          onClick={login}
          disabled={loading}
          className="w-full py-2 rounded bg-indigo-600 text-white font-bold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
