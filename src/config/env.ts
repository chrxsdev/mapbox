interface Config {
  mapbox: {
    token: string;
    searchUrl: string;
  };
}

export const config: Config = {
  mapbox: {
    token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    searchUrl: import.meta.env.VITE_MAPBOX_SEARCH_URL,
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [
  ['VITE_MAPBOX_ACCESS_TOKEN', config.mapbox.token],
  ['VITE_MAPBOX_SEARCH_URL', config.mapbox.searchUrl],
] as const;

for (const [name, value] of requiredEnvVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}
