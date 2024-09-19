import axios from "axios";

// const BASE_URL = "http://localhost:3002/api";
// const BASE_URL = "http://192.168.254.0:3002/api"
// const BASE_URL = "http://192.168.1.10:3002/api";
const BASE_URL = "http://192.168.254.139:3002/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const register = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// export const login = async (username, password) => {
//   try {
//     const response = await api.post("/login", {
//       username,
//       password,
//     });
//     return response.data; // Assuming your API returns user data
//   } catch (error) {
//     throw error.response ? error.response.data : new Error("Network Error");
//   }
// };
