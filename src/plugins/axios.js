import axios from "axios";
import {
  handleRequestError,
  handleResponseError,
  handleNetworkError,
} from "./handlingErrors";
let appInstance;
let networkErrorLogged = false;

// url
const STAGING_BACKEND_URL = "https://stg-backend.happytbooking.com/";
const STAGING_PYTHON_URL = "https://stg-py.happytbooking.com/";
const PRODUCTION_BACKEND_URL = "https://backend.happytbooking.com/";
const PRODUCTION_PYTHON_URL = "https://py.happytbooking.com/";

export const BASE_URL = STAGING_BACKEND_URL;
export const PYTHON_URL = STAGING_PYTHON_URL;

// Function to set the Vue instance
export function setVueInstance(instance) {
  appInstance = instance;
}

const Axios = axios.create({
  baseURL: BASE_URL,
  headers: { "Accept-Language": "EN" },
});

const AxiosSocket = axios.create({
  baseURL: PYTHON_URL,
  headers: { "Accept-Language": "EN" },
});

// Request interceptor
Axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token") || localStorage.getItem("guest_token")) {
      config.headers.Authorization =
        localStorage.getItem("token") || localStorage.getItem("guest_token");
      // console.log("my token", localStorage.getItem("token"));
    }
    if (config.method === "get") {
      config.params = {
        ...config.params,
        currency: localStorage.getItem("CURR") || "SAR",
      };
    }
    return config;
  },
  (error) => {
    console.log("request failed");
    handleRequestError(appInstance, error);
    return Promise.reject(error);
  },
);

// Request interceptor
AxiosSocket.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token") || localStorage.getItem("guest_token")) {
      config.headers.Authorization =
        localStorage.getItem("token") || localStorage.getItem("guest_token");
      console.log("my token", localStorage.getItem("token"));
    }
    if (config.method === "get") {
      config.params = {
        ...config.params,
        currency: localStorage.getItem("CURR") || "SAR",
      };
    }
    return config;
  },
  (error) => {
    console.log("request failed");
    handleRequestError(appInstance, error);
    return Promise.reject(error);
  },
);

// Response interceptor
const responseInterceptor = (response) => response;
const responseInterceptorSocket = (response) => response;

// Error interceptor
const errorInterceptor = (error) => {
  if (error.response && error.response.data.message === "Unauthenticated.") {
    window.localStorage.setItem("status", error.response.data.message);
    window.localStorage.removeItem("token");
  }
  if (error.request && !error.response) {
    // Network error, handle it here
    if (!networkErrorLogged) {
      handleNetworkError(appInstance, error);
      networkErrorLogged = true;
    }
  } else {
    handleResponseError(appInstance, error);
  }
  return Promise.reject(error);
};

Axios.interceptors.response.use(responseInterceptor, errorInterceptor);
AxiosSocket.interceptors.response.use(responseInterceptor, errorInterceptor);

export { AxiosSocket };
export default Axios;
