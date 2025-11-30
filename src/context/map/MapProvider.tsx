/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useReducer, type JSX } from 'react';
import { LngLatBounds, Marker, Popup, type Map, type SourceSpecification } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../';
import { directionsApi } from '../../apis';
import type { DirectionsResponse } from '../../interfaces/DirectionsResponse';

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

  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const resp = await directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);

    const { geometry } = resp.data.routes[0];
    const { coordinates: coords } = geometry;

    // Bounds
    const bounds = new LngLatBounds(start, start);

    for (const coord of coords) {
      bounds.extend(coord as [number, number]);
    }

    // Draw the polyline and fit bounds
    state.map?.fitBounds(bounds, {
      padding: 100,
    });

    // Defining the Polyline
    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    // Removing previous route if exists, the layer and source must have the same id
    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    // Adding the polyline to the map source
    state.map?.addSource('RouteString', sourceData);
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 5,
      },
    });
  };

  return <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>{children}</MapContext.Provider>;
};
