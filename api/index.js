import axios from 'axios';

export const axiosAuth = () => {
  let token = null;
  if (typeof window !== 'undefined' && window?.localStorage.getItem('user')) {
    token = JSON.parse(window?.localStorage.getItem('user'))?.token;
  }

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
