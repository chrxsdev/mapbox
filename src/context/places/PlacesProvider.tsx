import { useReducer, type JSX } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './PlacesReducer';

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
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);


  return <PlacesContext.Provider value={{ ...state }}>{children}</PlacesContext.Provider>;
};
