import { Router } from '@route-manager/react';
import Nav from './components/page/Nav/Nav';
import useFavouriteColor from './context/Favourites/hooks/useFavouriteColor';
import ROUTES from './routes';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

// This is a good single point of entry/export for a type-safe router
const router = Router.generate({
  routes: ROUTES,
  Layout,
  // TODO: It'd be nice to be able to register optional states from contexts within nested components
  useState() {
    const favouriteColor = useFavouriteColor();
    return {
      color: favouriteColor,
    };
  },
});

export default router;
