import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Ganti dengan URL API yang sesuai
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

export default AxiosInstance;
