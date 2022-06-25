import { useContext } from 'react';
import FavouritesContext from '../FavouritesContext';

function useFavourites() {
  return useContext(FavouritesContext);
}

export default useFavourites;
