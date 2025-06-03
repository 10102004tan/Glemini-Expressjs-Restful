import axios from 'axios';

const api = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3000/api',
    timeout: 5000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;