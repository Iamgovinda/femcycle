import axios from "axios";
import constant from "../config";
import { getToken, removeToken } from "../utils/token";

const instance = axios.create({
  baseURL: constant.apiURL,
});

const requestInterceptor = instance.interceptors.request.use(
  (config) => {
    const authToken = getToken();
    if (authToken?.token) {
      config.headers["Authorization"] = "Token " + authToken.token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const responseInterceptor = instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      removeToken({ name: "token" });
      window.location.href = "/";
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

axios.interceptors.request.eject(requestInterceptor);
axios.interceptors.response.eject(responseInterceptor);

export default instance;
