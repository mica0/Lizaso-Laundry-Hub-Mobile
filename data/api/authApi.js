import axios from 'axios';

const BASE_URL = 'https://your-api-url.com';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const login = async (username, password) => {
  try {
    const response = await api.post('/login', {
      username,
      password,
    });
    return response.data; // Assuming your API returns user data
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
