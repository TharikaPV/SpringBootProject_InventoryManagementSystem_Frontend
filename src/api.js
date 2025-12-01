import axios from "axios";

const baseURL = "http://localhost:8081"; // adjust if needed

// axios instance
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (err) => Promise.reject(err));

// Auth
export const login = (creds) => api.post("/api/auth/login", creds);

// Products
export const getProducts = () => api.get("/api/products").then(r => r.data);
export const addProduct = (payload) => api.post("/api/products/add", payload).then(r => r.data);
export const updateProduct = (id, payload) => api.put(`/api/products/update/${id}`, payload).then(r => r.data);
export const deleteProduct = (id) => api.delete(`/api/products/delete/${id}`).then(r => r.data);

// Users
export const getUsers = () => api.get("/api/users").then(r => r.data);
export const addUser = (payload) => api.post("/api/users/add", payload).then(r => r.data);
export const updateUser = (id, payload) => api.put(`/api/users/update/${id}`, payload).then(r => r.data);
export const deleteUser = (id) => api.delete(`/api/users/delete/${id}`).then(r => r.data);

// Admin
export const getDashboard = () => api.get("/api/admin/dashboard").then(r => r.data);

export default api;
