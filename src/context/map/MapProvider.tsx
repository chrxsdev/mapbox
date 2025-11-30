import { useReducer, type JSX } from 'react';
import { Marker, Popup, type Map } from 'mapbox-gl';
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
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = (map: Map) => {
    // Popup
    const myLocationPopup = new Popup().setHTML(`<h4>Your location</h4><p>Here you are</p>`);

    // Adding marker, popups to the map
    new Marker({
      color: '#61dafb',
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopup)
      .addTo(map);

    dispatch({ type: 'setMap', payload: map });
  };

  return <MapContext.Provider value={{ ...state, setMap }}>{children}</MapContext.Provider>;
};
