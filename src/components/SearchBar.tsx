import { useRef } from 'react';

export const SearchBar = () => {
  const debounceRef = useRef<number | null>(null);

  // Applying debouce for better performance
  const onQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      // todo: make the requests
      console.log('Searching place:', e.target.value);
    }, 1000);
  };

  return (
    <div className='search-container'>
      <input type='text' className='form-control' placeholder='Search a place...' onChange={onQueryChanged} />
    </div>
  );
};
