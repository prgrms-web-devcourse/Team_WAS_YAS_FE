import axios from 'axios';

const API_END_POINT = ' http://52.79.219.24:8080';

const setInterceptors = (instance, auth) => {
  auth &&
    instance.interceptors.request.use(
      (config) => {
        const TOKEN = JSON.parse(sessionStorage.getItem('YAS_USER_TOKEN'));
        config.headers.Authorization = `bearer ${TOKEN}`;
        return config;
      },
      (error) => {
        return Promise.reject(error.response);
      },
    );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error.response);
    },
  );
  return instance;
};

const createInstance = (options) => {
  const instance = axios.create({ baseURL: API_END_POINT, ...options });
  return setInterceptors(instance);
};
const request = createInstance();

const createInstanceWithAuth = (options) => {
  const instance = axios.create({ baseURL: API_END_POINT, ...options });
  return setInterceptors(instance, true);
};
const authRequest = createInstanceWithAuth();
