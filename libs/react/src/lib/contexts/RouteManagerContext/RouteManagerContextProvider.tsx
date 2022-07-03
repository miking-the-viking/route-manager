import { PropsWithChildren, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ParameterizedRoute from '../../Route/ParameterizedRoute/ParameterizedRoute';
import StaticRoute from '../../Route/StaticRoute/StaticRoute';
import evaluate from '../../Rule/evaluate';

import RouteManagerContext from './RouteManagerContext';
import { RouteManagerState } from './RouteManagerState';

type RouteManagerContextProviderProps<
  Key extends string,
  State extends Record<string, any>,
  ParamKeys extends string
> = {
  // useState: State | (() => State); // TODO: Will a function be better?
  useState: () => State;
  routes: (
    | StaticRoute<Key, State>
    | ParameterizedRoute<Key, ParamKeys, State>
  )[];
} & PropsWithChildren;

const RouteManagerContextProvider = <
  Key extends string,
  State extends Record<string, any>,
  ParamKeys extends string
>({
  children,
  useState,
  routes,
}: RouteManagerContextProviderProps<Key, State, ParamKeys>) => {
  console.log('RouteManagerContextProvider');

  const state = useState();

  const params = useParams();
  const checkRoute = useCallback(
    (
      route: StaticRoute<Key, State> | ParameterizedRoute<Key, ParamKeys, State>
    ) => {
      console.log('checkRoute', route, params, state);

      // if route does not have rules, they can access it
      if (!route.rules || route.rules.length === 0) return true;

      // all rules must pass to access the route
      const failureMessage = route.rules
        .map((rule) => evaluate(rule as any)(params, state))
        .filter((v) => !!v);

      console.log('failure message: ', failureMessage);
      return false;
    },
    [params, state]
  );

  // Type safety to the RouteManagerContext, for convenience
  const AppStateTypedRouteManagerContext =
    RouteManagerContext as any as React.Context<
      RouteManagerState<Key, State, ParamKeys>
    >;

  return (
    <AppStateTypedRouteManagerContext.Provider
      value={{
        routes,
        state,
        checkRoute,
      }}
    >
      {children}
    </AppStateTypedRouteManagerContext.Provider>
  );
};

export default RouteManagerContextProvider;
