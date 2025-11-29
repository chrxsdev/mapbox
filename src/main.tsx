import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';

import { config } from './config/env';
import App from './App';

// Set Mapbox access token
mapboxgl.accessToken = config.mapbox.token;

// Check for geolocation support
if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation not supported');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
