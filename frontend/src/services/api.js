import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" }
});

export const getFarmers = () => API.get("/farmers");
export const addFarmer = (farmer) => API.post("/farmers", farmer);
export const updateFarmer = (id, farmer) => API.put(`/farmers/${id}`, farmer);
export const deleteFarmer = (id) => API.delete(`/farmers/${id}`);

export const getCrops = () => API.get("/crops");
export const addCrop = (farmerId, crop) => API.post(`/crops/farmer/${farmerId}`, crop);
export const updateCrop = (id, crop) => API.put(`/crops/${id}`, crop);
export const deleteCrop = (id) => API.delete(`/crops/${id}`);
