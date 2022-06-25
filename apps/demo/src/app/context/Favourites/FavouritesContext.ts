import { createContext } from 'react';
import FavouritesState from './FavouritesState';

const FavouritesContext = createContext<FavouritesState>(null as any);

export default FavouritesContext;
