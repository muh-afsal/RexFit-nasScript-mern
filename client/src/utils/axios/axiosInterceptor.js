
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const CLIENT_API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});


CLIENT_API.interceptors.request.use(
    (config) => {
        // console.log('Request:', config.method, config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


CLIENT_API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default CLIENT_API;