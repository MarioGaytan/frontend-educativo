import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // misma base que usuarios
});

// CRUD de Topics
export const getTopics = () => API.get("/topics");
export const createTopic = (data) => API.post("/topics", data);
export const updateTopic = (id, data) => API.patch(`/topics/${id}`, data);
export const deleteTopic = (id) => API.delete(`/topics/${id}`);
