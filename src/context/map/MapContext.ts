import { createContext } from 'react';
import type { Map } from 'mapbox-gl';

interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
}

export const MapContext = createContext<MapContextProps>({} as MapContextProps);
