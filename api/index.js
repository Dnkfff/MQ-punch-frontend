import axios from 'axios';

let token = null;
if (typeof window !== 'undefined' && window?.localStorage.getItem('user')) {
  token = JSON.parse(window?.localStorage.getItem('user'))?.token;
}

export const axiosAuth = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
