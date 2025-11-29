import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

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
