import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../context';
import type { Feature } from '../interfaces/MapResponse';

export const SearchResults = () => {
  const [activeId, setActiveId] = useState<string | null>('');
  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const onPlaceClick = (place: Feature) => {
    const [lng, lat] = place.center;

    setActiveId(place.id);

    // Move the map to the selected place
    map?.flyTo({
      zoom: 14,
      center: [lng, lat],
    });
  };

  if (isLoadingPlaces) {
    return <div className='alert alert-info mt-3'>Searching places...</div>;
  }

  if (!places || places.length === 0) {
    return <></>;
  }

  return (
    <ul className='list-group mt-3'>
      {places.map((place) => (
        <li
          key={place.id}
          className={`list-group-item list-group-item-action pointer ${activeId === place.id ? 'active' : ''}`}
          onClick={() => onPlaceClick(place)}
        >
          <h6>{place.text}</h6>
          <p
            style={{
              fontSize: '12px',
            }}
          >
            {place.place_name}
          </p>
          <button className={`btn btn-sm ${activeId === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}>Get Address</button>
        </li>
      ))}
    </ul>
  );
};
