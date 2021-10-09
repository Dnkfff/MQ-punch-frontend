import axios from 'axios';

const authEndpoint = 'http://localhost:8080';
const service = axios.create({
  baseURL: authEndpoint,
});

const onRefreshToken = async ({ oldToken, setLoading }) => {
  setLoading(true);

  try {
    const result = await service.post('/auth/refresh', {
      refreshToken: oldToken,
    });
  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};
