import Color from './Color';

type FavouritesState = {
  color: Color;
  setColor: (color: Color) => void;
  band: string;
  setBand: (band: string) => void;
};

export default FavouritesState;
