import { useEffect, useReducer, type JSX } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './PlacesReducer';
import { getUserLocation } from '../../helpers';

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

  useEffect(() => {
    getUserLocation().then((lgnLat) => dispatch({ type: 'setUserLocation', payload: lgnLat }));
  }, []);

  return <PlacesContext.Provider value={{ ...state }}>{children}</PlacesContext.Provider>;
};
