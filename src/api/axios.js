import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan URL API yang sesuai
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
