import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseURL = 'http://10.4.5.73:8000';
const adminUrl = 'import.meta.env.VITE_ADMINBASEURL'

// Axios instance for regular user
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseURL,
});
export const axiosInstanceNoToken: AxiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    interface User {
      access: string;
      // Other properties in your user object
    }
    
    const storedUserString = localStorage.getItem('user');
    if(storedUserString){
      
    const user: User = JSON.parse(storedUserString);
    
    
    const userToken = user?.access;

    if (userToken !== null) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${userToken}`,
      };
    } else {
      config.headers = {
        ...(config.headers || {}),
      };
    }}

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios instance for admin
export const adminaxios: AxiosInstance = axios.create({
  baseURL: adminUrl,
});

adminaxios.interceptors.request.use(
  (config: any) => {
    const adminToken = localStorage.getItem('admin');

    if (adminToken !== null) {
      config.headers = {
        ...(config.headers || {}),
        Authorization: `Bearer ${adminToken}`,
      };
    } else {
      config.headers = {
        ...(config.headers || {}),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
