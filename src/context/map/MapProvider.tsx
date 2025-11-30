/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useReducer, type JSX } from 'react';
import { Marker, Popup, type Map } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    // Remove existing markers
    state.markers.forEach((marker) => marker.remove());

    if (!places) return;
    if (!state.map) return;

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;

      const popup = new Popup().setHTML(`<h4>${place.text_es}</h4><p>${place.place_name_es}</p>`);

      const newMarker = new Marker({ color: '#61dafb' }).setLngLat([lng, lat]).setPopup(popup).addTo(state.map);

      newMarkers.push(newMarker);
    }

    // TODO: Clean polylines

    dispatch({ type: 'setMarkers', payload: newMarkers });
  }, [places]);

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
