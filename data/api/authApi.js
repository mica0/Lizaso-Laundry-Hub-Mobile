import { api } from "../axios";

export const register = async (data) => {
  try {
    const response = await api.post("/register", data); // Corrected parameter name to 'data'
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data) => {
  try {
    const response = await api.post("/login-mobile", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Test if the base URL is working
// const testConnection = async () => {
//   try {
//     const response = await api.get("/"); // Assuming you have a root endpoint or a health check endpoint
//     console.log("Base URL is working. Response:", response.data);
//   } catch (error) {
//     console.error("Error connecting to the base URL:", error.message);
//   }
// };

// // Call the test function
// testConnection();

// export const login = async (data) => {
//   try {
//     const response = await api.post("/login", data);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error("Network Error");
//   }
// };

// import axios from "axios";

// const BASE_URL = "http://192.168.254.139:3002/api";
// const BASE2_URL = "http://192.168.254.162:3002/api";

// const testUrl = async (url) => {
//   try {
//     const response = await axios.get(url);
//     return response.status === 200;
//   } catch {
//     return false;
//   }
// };

// const getWorkingUrl = async () => {
//   const urls = [BASE_URL, BASE2_URL];
//   for (const url of urls) {
//     if (await testUrl(url)) {
//       return url;
//     }
//   }
//   throw new Error("No working URL found");
// };

// // Create a function to initialize and export API functions
// export const initializeApi = async () => {
//   try {
//     const workingUrl = await getWorkingUrl();
//     console.log(`Using working URL: ${workingUrl}`);

//     const api = axios.create({
//       baseURL: workingUrl,
//       timeout: 500,
//     });

//     // Export the API functions using the initialized axios instance
//     return {
//       register: async (userData) => {
//         try {
//           const response = await api.post("/register", userData);
//           return response.data;
//         } catch (error) {
//           throw error.response
//             ? error.response.data
//             : new Error("Network Error");
//         }
//       },
//     };
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// import axios from "axios";

// const BASE_URL = "http://192.168.254.162:3002/api";

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 5000,
// });

// export const register = async (data) => {
//   try {
//     const response = await api.post("/register", userData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : new Error("Network Error");
//   }
// };

// const BASE_URL = "http://192.168.254.139:3002/api";
// const BASE_PC = "http://192.168.254.162:3002/api";

// const BASE_URL = "http://localhost:3002/api";
// const BASE_URL = "http://192.168.254.0:3002/api"
// const BASE_URL = "http://192.168.1.10:3002/api";

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
