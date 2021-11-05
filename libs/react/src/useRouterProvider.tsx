/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import {
  BrowserRouter,
  Navigate,
  RouteObject,
  useLocation,
  useRoutes,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Route from './Route';

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
  const Router = useRoutes([
    ...routes,
    // {
    //   path: '*',
    //   element: <Navigate to="/" />,
    // },
  ]);
  return Router;
};

function checkAndSetupDefaultRoute(routes: Route<any>[]) {
  // If the routes provide a '*' then no additional work by the lib is necessary
  const starRoute = routes.find((r) => r.path === '*');
  if (starRoute) return routes;

  // If the routes define a `default`: true, that is the fallback route for '*'
  // Toss in validation to make sure there is no dynamic slug, must be a static string
  let defaultRoute = routes.find((r) => r.default);

  if (!defaultRoute)
    // If the routes do not provide a '*', don't provide a `default` and they define a '/' then we can redirect to that
    defaultRoute = routes.find((r) => r.path === '/');

  if (defaultRoute)
    return [
      ...routes,
      {
        path: '*',
        element: <Navigate to={defaultRoute.path} />,
      },
    ];

  return routes;
}

const useRouterProvider: <RouterState extends Record<string, any>>(
  routes: Route<RouterState>[]
) => JSX.Element = (routes) => {
  const wrappedOrUnwrappedRouter = useRef<JSX.Element>(null);
  if (wrappedOrUnwrappedRouter.current) return wrappedOrUnwrappedRouter.current;

  const routesWithDefault = checkAndSetupDefaultRoute(routes);

  const routerProvider = <AppRouter {...{ routes: routesWithDefault }} />;

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
