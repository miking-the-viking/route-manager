import { useRouter } from '@route-manager/react';
import React from 'react';
import Nav from './components/page/Nav/Nav';
import Color from './context/Favourites/Color';
import FavouritesContextProvider from './context/FavouritesContextProvider';
import ROUTES from './routes';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export function App() {
  const router = useRouter({ routes: ROUTES, Layout });
  return (
    <div>
      <h1>App</h1>
      <FavouritesContextProvider color={Color.Red}>
        {router}
      </FavouritesContextProvider>
    </div>
  );
}

export default App;
