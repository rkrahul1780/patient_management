import axios from 'axios';
  console.log('localStorage', localStorage.getItem('token'));
const Instance = axios.create({
  baseURL: 'http://localhost:3009/',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

Instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default Instance;
