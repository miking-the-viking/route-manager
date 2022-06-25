import FavouriteColorForm from '../../components/forms/FavouriteColorForm/FavouriteColorForm';
import useFavouriteColor from '../../context/Favourites/hooks/useFavouriteColor';

const Welcome: React.FC = () => {
  const color = useFavouriteColor();
  return (
    <div>
      <h2>Welcome</h2>
      <p>Your favourite color is {color}</p>
      <FavouriteColorForm />
    </div>
  );
};
export default Welcome;
