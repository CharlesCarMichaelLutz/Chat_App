import axios from 'axios';

export const baseApi = axios.create({
    baseURL: "", 
    withCredentials: true
})

export const axiosPrivate = axios.create({
    baseURL: "", 
    headers: { 'Content-Type': 'application/json' }, 
    withCredentials: true
})
