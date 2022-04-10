import aAxios from 'axios';

const axios = aAxios.create();
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO
    console.log('error handling');
  }
);

const axiosAuth = aAxios.create();
axiosAuth.interceptors.request.use(
  async (config) => {
    let token = null;
    if (typeof window !== 'undefined' && window?.localStorage.getItem('user')) {
      token = JSON.parse(window?.localStorage.getItem('user'))?.token;
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };

    return config;
  },
  (error) => {
    // TODO
    console.log('error handling');
  }
);

export { axios, axiosAuth };
