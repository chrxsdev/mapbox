import axios from 'axios';
import { config } from '../config/env';

const searchApi = axios.create({
  baseURL: config.mapbox.searchUrl,
  params: {
    limit: 5,
    language: 'es',
    access_token: config.mapbox.token,
  },
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export default searchApi;