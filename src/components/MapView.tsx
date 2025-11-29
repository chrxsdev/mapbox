/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef } from 'react';
import { Loading } from './Loading';
import mapboxgl from 'mapbox-gl';

import { PlacesContext } from '../context';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && mapDiv.current) {
      new mapboxgl.Map({
        container: mapDiv.current!, // container ID
        style: 'mapbox://styles/mapbox/streets-v12', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 8, // starting zoom
      });
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: 'red',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    ></div>
  );
};
