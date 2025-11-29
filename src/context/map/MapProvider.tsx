import { useReducer,  type JSX } from 'react';
import type { Map } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [state] = useReducer(mapReducer, INITIAL_STATE);

  return <MapContext.Provider value={{ ...state }}>{children}</MapContext.Provider>;
};
