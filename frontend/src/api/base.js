import axios from 'axios';

//export const baseApi = axios.create({baseURL: import.meta.env.VITE_SERVER_URL})
export const baseApi = axios.create({baseURL: import.meta.env.VITE_SERVER_URL, withCredentials: true})
