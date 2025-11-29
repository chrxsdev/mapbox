import { useContext } from 'react';
import { Loading } from './Loading';

import { PlacesContext } from '../context';

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);

  if (isLoading) return <Loading />;

  return (
    <div>
      <p>{userLocation?.join(', ')}</p>
    </div>
  );
};
