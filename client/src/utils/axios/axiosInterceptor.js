import axios from 'axios';
import {BASE_URL} from "../../common/Configuration.js"

export const CLIENT_API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});


CLIENT_API.interceptors.request.use(
    (config) => {
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