import React from 'react';
import { RouteManagerState } from './RouteManagerState';

// TODO: May need to generate this so that we can use the generics for
const RouteManagerContext = React.createContext<
  RouteManagerState<string, Record<string, any>, string>
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
