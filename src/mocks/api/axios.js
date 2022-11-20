import axios from "axios";
import { removeTokenFromStorageIfUnauthorizedResponse, setAuthHeadersOnRequest } from "./utils";

const instance = axios.create({});
instance.interceptors.request.use(setAuthHeadersOnRequest);
instance.interceptors.response.use(null, removeTokenFromStorageIfUnauthorizedResponse);

export default instance;
