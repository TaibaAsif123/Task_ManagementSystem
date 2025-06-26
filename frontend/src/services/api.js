// src/services/api.js

import axios from "axios";

const api = "http://localhost:3000/api/tasks"; // adjust if your backend is on a different port
export const getTaskById = (id) => axios.get(`${api}/${id}`);
export const getTasks = () => axios.get(api);
export const createTask = (taskData) => axios.post(api, taskData);
export const getTask = (id) => axios.get(`${api}/${id}`);
export const updateTask = (id, updatedData) => axios.put(`${api}/${id}`, updatedData);
export const deleteTask = (id) => axios.delete(`${api}/${id}`); 
