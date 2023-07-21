import axios from "axios";
import { getStoredToken } from "../utils/helperfuncs";

const instance = axios.create({});

instance.interceptors.request.use(
  function (config) {
    const token = getStoredToken();
    config.headers.Authorization = `Bearer ${JSON.parse(token)}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
