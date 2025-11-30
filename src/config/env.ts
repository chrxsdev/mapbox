interface Config {
  mapbox: {
    token: string;
    searchUrl: string;
    directionsUrl: string;
  };
}

export const config: Config = {
  mapbox: {
    token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    searchUrl: import.meta.env.VITE_MAPBOX_SEARCH_URL,
    directionsUrl: import.meta.env.VITE_MAPBOX_DIRECTIONS_URL,
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  ['VITE_MAPBOX_ACCESS_TOKEN', config.mapbox.token],
  ['VITE_MAPBOX_SEARCH_URL', config.mapbox.searchUrl],
  ['VITE_MAPBOX_DIRECTIONS_URL', config.mapbox.directionsUrl],
] as const;

for (const [name, value] of requiredEnvVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}
