import axios from "axios";
import { containsSuspiciousInput, isTokenExpired } from "../utils/valids";

export const apiConfig = axios.create({
    baseURL: 'https://jsonbulut.com/api/',
    timeout: 15000,
    withCredentials: false,
})

apiConfig.interceptors.request.use(config => {

    // header içindeki jwt bearer token almak ve isTokenExpired kontrolü yapmak
    const token = localStorage.getItem('token');
    if (token) {
        if (isTokenExpired(token)) {
            localStorage.removeItem('token');
            throw new Error("Token expired. Please log in again.");
        }
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (containsSuspiciousInput(config.data)) {
        throw new Error("Şüpheli kullanıcı girdisi tespit edildi.");
    }

    if (containsSuspiciousInput(config.params)) {
        throw new Error("Şüpheli kullanıcı girdisi tespit edildi.");
    }

    return config;
});