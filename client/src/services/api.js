import axios from "axios";

const API = axios.create({
    baseURL: "https://billing-system-u0n0.onrender.com/api",
});

export default API;