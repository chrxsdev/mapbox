import type { PlacesState } from './PlacesProvider';

type PlacesActions = {
  type: 'setUserLocation';
  payload: [number, number];
};

export const placesReducer = (state: PlacesState, action: PlacesActions): PlacesState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        isLoading: false,
        userLocation: action.payload,
      };
    default:
      return state;
  }
};
