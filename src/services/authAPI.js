import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: { "Content-Type": "application/json" },
});

export const login = (cpf, password) =>
  api.post("/auth/login", { cpf, password });
