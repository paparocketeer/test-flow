import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://mok-automate.rnd.flowai.ru',
  headers: {
    'Content-Type': 'application/json',
  },
}); 