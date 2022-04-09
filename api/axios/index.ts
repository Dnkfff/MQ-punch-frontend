import aAxios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const axiosFromInstance = (axiosInstance: AxiosInstance) => ({
  get: (url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get(url, config).catch((error) => {
      // TODO
      console.log('error handling');
    }),
  post: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.post(url, data, config).catch((error) => {
      // TODO
      console.log('error handling');
    }),
  put: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.put(url, data, config).catch((error) => {
      // TODO
      console.log('error handling');
    }),
  patch: (url: string, data?: any, config?: AxiosRequestConfig) =>
    axiosInstance.patch(url, data, config).catch((error) => {
      // TODO
      console.log('error handling');
    }),
});

const axiosAuth = () => {
  let token = null;
  if (typeof window !== 'undefined' && window?.localStorage.getItem('user')) {
    token = JSON.parse(window?.localStorage.getItem('user'))?.token;
  }

  const authAxiosInstance = aAxios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosFromInstance(authAxiosInstance);
};

const axios = axiosFromInstance(aAxios);

export { axios, axiosAuth };
