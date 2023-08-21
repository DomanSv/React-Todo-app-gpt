import axios from "axios";
import { getStoredToken } from "../utils/helperfuncs";

const instance = axios.create({ baseURL: 'http://localhost:8080'});

instance.interceptors.request.use(
  function (config) {
    const token = getStoredToken();
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
