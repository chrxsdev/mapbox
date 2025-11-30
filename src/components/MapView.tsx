/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef } from 'react';
import { Loading } from './Loading';
import mapboxgl from 'mapbox-gl';

import { PlacesContext, MapContext } from '../context';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && mapDiv.current) {
      const map = new mapboxgl.Map({
        container: mapDiv.current, // container ID
        style: 'mapbox://styles/mapbox/light-v10', // style URL we can change the theme here
        center: userLocation, // starting position [lng, lat]
        zoom: 9, // starting zoom
      });

      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: 'gray',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    ></div>
  );
};
