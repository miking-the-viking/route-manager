import { PropsWithChildren, useState } from 'react';
import Color from './Favourites/Color';
import FavouritesContext from './Favourites/FavouritesContext';

type FavouritesContextProviderProps = {
  color: Color;
  band?: string;
} & PropsWithChildren;

const FavouritesContextProvider: React.FC<FavouritesContextProviderProps> = ({
  band: faveBand,
  color: faveColor,
  children,
}) => {
  const [band, setBand] = useState<string>(faveBand ?? '');
  const [color, setColor] = useState<Color>(faveColor);
  return (
    <FavouritesContext.Provider value={{ band, setBand, color, setColor }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContextProvider;
