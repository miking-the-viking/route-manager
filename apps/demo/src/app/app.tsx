import useRouter from '@route-manager/react';
import Nav from './components/page/Nav/Nav';
import Color from './context/Favourites/Color';
import FavouritesContextProvider from './context/FavouritesContextProvider';
import ROUTES from './routes';

export function App() {
  const router = useRouter({ routes: ROUTES });
  return (
    <div>
      <h1>App</h1>
      <Nav />
      <FavouritesContextProvider color={Color.Red}>
        {router}
      </FavouritesContextProvider>
    </div>
  );
}

export default App;
