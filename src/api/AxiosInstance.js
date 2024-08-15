import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://test.msikaranganyar.com', // Ganti dengan URL API yang sesuai
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default AxiosInstance;
