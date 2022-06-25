import { useRef } from 'react';
import { RouteObject, useRoutes, useLocation } from 'react-router-dom';
import BrowserProvider from '../BrowserProvider/BrowserProvider';

type RouterProps = {
  routes: RouteObject[];
};

const Router: React.FC<RouterProps> = ({ routes }) => {
  const router = useRoutes(routes);
  return router;
};

/**
 * Returns a fully loaded Router for the given routes
 */
const useRouter = ({ routes }: RouterProps) => {
  const wrappedOrUnwrappedRouter = useRef<JSX.Element | null>(null);
  if (wrappedOrUnwrappedRouter.current) return wrappedOrUnwrappedRouter.current;

  const routerProvider = <Router {...{ routes }} />;

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLocation();
    wrappedOrUnwrappedRouter.current = routerProvider;
  } catch (e) {
    wrappedOrUnwrappedRouter.current = (
      <BrowserProvider>{routerProvider}</BrowserProvider>
    );
  }
  return wrappedOrUnwrappedRouter.current;
};

export default useRouter;
