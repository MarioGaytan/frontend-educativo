import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/", // tu API NestJS
});

// CRUD de usuarios
export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.patch(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);
