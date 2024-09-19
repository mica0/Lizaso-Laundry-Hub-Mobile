import axios from "axios";
const API_URL = "http://localhost:3002/api";

export const axiosPrivate = axios.create({
  baseURL: API_URL,
});
