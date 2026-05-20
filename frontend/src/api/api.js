import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "https://smart-nearby-places-axh0.onrender.com"
});


export const adminApi = () =>
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`
    }
  });
