import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_V1_URL,
  timeout: 15000, // 15 seconds — fail fast instead of spinning forever
});

export const loginUser = async (user) =>
  api.get("/auth/login-user", {
    headers: { authtoken: user.token },
  });

export const registerUser = async (user) =>
  api.post("/auth/register-user", { role: user.role, email: user.email });

export const getCurrentUser = async (authtoken) =>
  api.post("/auth/current-user", {}, { headers: { authtoken } });
