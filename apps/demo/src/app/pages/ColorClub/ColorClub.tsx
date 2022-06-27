import { useOutlet, useParams } from 'react-router-dom';
import FavouriteColorForm from '../../components/forms/FavouriteColorForm/FavouriteColorForm';
import useFavouriteColor from '../../context/Favourites/hooks/useFavouriteColor';

const ColorClub: React.FC = () => {
  const { color } = useParams();
  const fave = useFavouriteColor();
  const Outlet = useOutlet();
  return (
    <>
      <h2>
        Color Club for {color} your favourite is {fave}
      </h2>
      <FavouriteColorForm />
      {Outlet}
    </>
  );
};

export default ColorClub;
