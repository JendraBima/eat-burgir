import axios from "axios";
import { getToken, removeToken } from "./TokenHandle";

export const useApiClient = () => {
    const client = axios.create({
        baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
        headers: {
            "Content-Type": "application/json",
        },
    })

    client.interceptors.request.use((config) => {
        const token = getToken();
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (err) => {
        return Promise.reject(err);
    })

    client.interceptors.response.use(
        (res) => (res),
        (err) => {
            console.error("API ERROR", err)
            // Temporarily disabled - auto redirect to login on 401
            // if(err.response && err.response.status === 401) {
            //     removeToken();
            //     window.location.href = "/login";
            // }
            return Promise.reject(err);
        }
    )

    return client;
}