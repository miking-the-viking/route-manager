import React from 'react';
import { RouteManagerState } from './RouteManagerState';

const RouteManagerContext = React.createContext<
  RouteManagerState<Record<string, any>>
>({
  state: {},
  routes: [],
  checkRoute: () => false,
  // allowedRoutes: [],
  // activeRoute: null,
  // setVariantState: () => {
  //   /** */
  // },
  // allowedRouteBySymbol: () => null,
  // redirectCheck: () => {
  //
  // },
});

export default RouteManagerContext;
