import { Router } from '@route-manager/react';
import Nav from './components/page/Nav/Nav';
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
const router = Router.generate({ routes: ROUTES, Layout });

export default router;
