import axios from 'axios';

const service = axios.create({
  baseUrl: 'http://localhost:8080',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export { service };
