# Maps App

A React application featuring interactive maps powered by Mapbox GL. This app demonstrates modern React patterns with TypeScript, including context API for state management, geolocation services, and dynamic map interactions.

## Features

- **Interactive Maps**: Browse and interact with maps using Mapbox GL
- **Geolocation**: Get user's current location with high accuracy
- **Responsive Design**: Mobile-friendly interface with Bootstrap 5
- **Type Safety**: Full TypeScript support for better developer experience
- **Fast Development**: Hot Module Replacement (HMR) with Vite

## Technologies

- **React 19**: Latest version with improved performance and features
- **TypeScript**: Static typing for better code quality and IDE support
- **Vite**: Next-generation frontend tooling for fast builds and HMR
- **Mapbox GL**: WebGL-powered vector maps and geospatial analysis
- **Bootstrap 5**: Modern responsive CSS framework for UI components

## Project Structure

```
src/
├── apis/          # External API integrations and services
├── components/    # Reusable React components
├── config/        # App configuration (Mapbox tokens, settings)
├── context/       # React Context providers for state management
├── helpers/       # Utility functions (geolocation, formatting)
├── interfaces/    # TypeScript type definitions and interfaces
├── screens/       # Main application views/pages
└── MapsApp.tsx    # Root application component
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Mapbox API token (get one at [mapbox.com](https://www.mapbox.com))

### Installation

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Set up your Mapbox token in the configuration file

### Development

```bash
# Run development server (default: http://localhost:5173)
yarn dev

# Build for production
yarn build

# Preview production build locally
yarn preview

# Run ESLint to check code quality
yarn lint
```

## Usage

1. Allow browser location access when prompted
2. The map will center on your current location
3. Interact with the map using mouse/touch gestures:
   - Drag to pan
   - Scroll to zoom
   - Double-click to zoom in
   - Right-click drag to rotate
