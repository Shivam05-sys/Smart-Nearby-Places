import { adminApi } from "./api";

export const searchGooglePlaces = (query) =>
  adminApi().get(`/google/search?query=${query}`);

export const importGooglePlace = (data) =>
  adminApi().post("/google/import", data);
