import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'https://test.msikaranganyar.com/',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default AxiosInstance;
