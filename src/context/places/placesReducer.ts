import type { Feature } from '../../interfaces/MapResponse';
import type { PlacesState } from './PlacesProvider';

type PlacesActions =
  | {
      type: 'setUserLocation';
      payload: [number, number];
    }
  | {
      type: 'setLoadingPlaces';
    }
  | {
      type: 'savePlaces';
      payload: Feature[];
    };

export const placesReducer = (state: PlacesState, action: PlacesActions): PlacesState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case 'setLoadingPlaces':
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    case 'savePlaces':
      return {
        ...state,
        places: action.payload,
        isLoadingPlaces: false,
      };
    default:
      return state;
  }
};
