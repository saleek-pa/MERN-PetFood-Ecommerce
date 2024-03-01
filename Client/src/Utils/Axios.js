import Axios from 'axios';

const token = localStorage.getItem('jwt_token');

export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    withCredentials: true,
  },
});
