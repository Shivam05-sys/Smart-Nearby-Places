import { api } from "./api";

export const getRecommendations = (mood, lat, lng) =>
  api.get(`/recommend?mood=${mood}&lat=${lat}&lng=${lng}`);
