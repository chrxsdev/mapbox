import axios from 'axios';
import { config } from '../config/env';

const searchApi = axios.create({
  baseURL: config.mapbox.directionsUrl,
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: config.mapbox.token,
  },
  headers: { 'Content-Type': 'application/json' },
});

export default searchApi;