import useFavourites from './useFavourites';

function useFavouriteBand() {
  const { band } = useFavourites();
  return band;
}

export default useFavouriteBand;
