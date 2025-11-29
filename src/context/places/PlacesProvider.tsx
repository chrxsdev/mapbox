import type { JSX } from 'react';
import { PlacesContext } from './PlacesContext';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

interface PlacesProviderProps {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider = ({ children }: PlacesProviderProps) => {
  return <PlacesContext.Provider value={{ ...INITIAL_STATE }}>{children}</PlacesContext.Provider>;
};
