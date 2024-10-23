import axios from "axios";

// const BASE_URL = "http://192.168.254.162:3002/api";
const BASE_URL = "http://192.168.254.139:3002/api";

// Create an instance of axios
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // Timeout set to 5 seconds
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Request Interceptor
api.interceptors.request.use(
  async (config) => {
    // Retrieve the token from AsyncStorage
    const token = await AsyncStorage.getItem("accessToken"); // Ensure the key matches what you use
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Example: Add a token to every request
//     const token = "your-token-here"; // Replace with actual token logic
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response; // Return only the data from the response
  },
  (error) => {
    // Handle any errors
    console.error(
      "API Error:",
      error.response ? error.response.data : error.message
    );
    return Promise.reject(error); // Pass error to the calling function
  }
);

// import axios from "axios";
// const API_URL = "http://localhost:3002/api";

// export const axiosPrivate = axios.create({
//   baseURL: API_URL,
// });

// import axios from "axios";

// const BASE_URL = "http://192.168.254.162:3002/api";

// export const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 5000,
// });
