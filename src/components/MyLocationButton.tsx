import { useContext } from 'react';
import { MapContext, PlacesContext } from '../context';

export const MyLocationButton = () => {
  const { map, isMapReady } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const onClick = () => {
    if (!isMapReady) throw new Error('Map is not ready');
    if (!userLocation) throw new Error('User location is not defined');

    // Fly to the user's location
    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button
      className='btn btn-primary'
      onClick={onClick}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 990,
      }}
    >
      My Location
    </button>
  );
};
