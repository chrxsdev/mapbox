import { createContext } from 'react';
import type { Feature } from '../../interfaces/MapResponse';

interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];
  places?: Feature[];
  isLoadingPlaces?: boolean;

  // Methods
  searchPlacesbyTerm: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContextProps>({} as PlacesContextProps);