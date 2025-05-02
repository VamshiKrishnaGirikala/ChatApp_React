import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your API base URL
    withCredentials: true, // Include credentials (cookies) in requests
});