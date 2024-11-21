// utils/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Adjust this if you have a different API base path
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
