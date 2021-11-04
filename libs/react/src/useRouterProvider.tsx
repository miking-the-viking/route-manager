import React, { useRef } from 'react';
import {
  BrowserRouter,
  RouteObject,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Sets up required `BrowserRouter` as well as a `HelmetProvider` for dynamically updating the page title on the fly
 *
 *
 *
 * **Ensure that the main component is wrapped by this function**
 */
export const BrowserProvider: React.FC = ({ children }) => (
  <BrowserRouter>
    <HelmetProvider>{children}</HelmetProvider>
  </BrowserRouter>
);

export type RouteType = RouteObject;

const AppRouter: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const Router = useRoutes(routes);
  return Router;
};

const useRouterProvider: (routes: RouteType[]) => JSX.Element = (routes) => {
  const wrappedOrUnwrappedRouter = useRef<JSX.Element>(null);
  if (wrappedOrUnwrappedRouter.current) return wrappedOrUnwrappedRouter.current;

  const routerProvider = <AppRouter {...{ routes }} />;

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

export default useRouterProvider;
