import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getUsers = (token) =>
  API.get("/users", { headers: { Authorization: `Bearer ${token}` } });

export const createUser = (data) => {
  const token = localStorage.getItem("token");
  return API.post("/users", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateUser = (id, data) => {
  const token = localStorage.getItem("token");
  return API.put(`/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteUser = (id) => {
  const token = localStorage.getItem("token");
  return API.delete(`/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
