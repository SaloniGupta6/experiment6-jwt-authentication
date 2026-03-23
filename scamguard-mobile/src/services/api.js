import axios from "axios";

const api = axios.create({
  baseURL: "https://experiment6-jwt-authentication-1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;