interface Config {
  mapbox: {
    token: string;
  };
}

export const config: Config = {
  mapbox: {
    token: import.meta.env.MAPBOX_ACCESS_TOKEN,
  },
} as const;

// Validate required environment variables
const requiredEnvVars = [['MAPBOX_ACCESS_TOKEN', config.mapbox.token]] as const;

for (const [name, value] of requiredEnvVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}
