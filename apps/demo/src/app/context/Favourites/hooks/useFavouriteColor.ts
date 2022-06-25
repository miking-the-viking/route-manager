import useFavourites from './useFavourites';

function useFavouriteColor() {
  const { color } = useFavourites();
  return color;
}

export default useFavouriteColor;
