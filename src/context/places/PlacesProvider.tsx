import { useEffect, useReducer, type JSX } from 'react';
import { PlacesContext } from './PlacesContext';
import { getUserLocation } from '../../helpers';
import { placesReducer } from './placesReducer';
import { searchApi } from '../../apis';
import type { Feature, PlacesResponse } from '../../interfaces/MapResponse';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces?: boolean;
  places?: Feature[];
}

interface PlacesProviderProps {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

export const PlacesProvider = ({ children }: PlacesProviderProps) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const [long, lat] = await getUserLocation();
        dispatch({ type: 'setUserLocation', payload: [long, lat] });
      } catch (error) {
        console.error({ error });
      }
    };

    getPermissions();
  }, []);

  const searchPlacesbyTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'savePlaces', payload: [] });
      return [];
    }
    if (state.userLocation === undefined) throw new Error('User location is not defined');

    // Set loading state
    dispatch({ type: 'setLoadingPlaces' });

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','), // Define user location as proximity
      },
    });

    // Saving the places
    dispatch({ type: 'savePlaces', payload: resp.data.features });

    return resp.data.features;
  };

  return <PlacesContext.Provider value={{ ...state, searchPlacesbyTerm }}>{children}</PlacesContext.Provider>;
};
