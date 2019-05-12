import axios from 'axios';
import NProgress from 'nprogress';

export default () => {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BACKEND || 'https://bonsain.herokuapp.com/'
  });

  instance.interceptors.request.use(
    config => {
      NProgress.start();
      return config;
    },
    error => {
      NProgress.done();
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(response => {
    NProgress.done();
    return response;
  });

  return instance;
};
