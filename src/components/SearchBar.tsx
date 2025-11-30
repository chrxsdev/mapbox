import { useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
  const { searchPlacesbyTerm } = useContext(PlacesContext);

  const debounceRef = useRef<number | null>(null);

  // Applying debouce for better performance
  const onQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      searchPlacesbyTerm(e.target.value);
    }, 500);
  };

  return (
    <div className='search-container'>
      <input type='text' className='form-control' placeholder='Search a place...' onChange={onQueryChanged} />
      <SearchResults />
    </div>
  );
};
