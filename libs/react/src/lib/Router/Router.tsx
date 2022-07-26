/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, useContext, useRef } from 'react';
import { useInRouterContext } from 'react-router-dom';
import BrowserProvider from '../components/BrowserProvider/BrowserProvider';
import IndexRouter from '../components/IndexRouter/IndexRouter';
import SafeLink from '../components/SafeLink/SafeLink';
import RouteManagerContext from '../contexts/RouteManagerContext/RouteManagerContext';
import RouteManagerContextProvider from '../contexts/RouteManagerContext/RouteManagerContextProvider';
import { RouteManagerState } from '../contexts/RouteManagerContext/RouteManagerState';
import ParameterizedRoute from '../Route/ParameterizedRoute/ParameterizedRoute';
import Route from '../Route/Route';
import StaticRoute from '../Route/StaticRoute/StaticRoute';

type KeyOfRoutes<
  Key extends string,
  AppState extends Record<string, any>
> = StaticRoute<Key, AppState>['key'];

export type RouterProps<
  Key extends string,
  State extends Record<string, any>,
  Params extends string
> = Parameters<typeof Router<Key, State, Params>['generate']>[number];

/**
 * Wrap the router in
 *  - Route Manager Context
 *  - Conditional BrowserProvider
 *  - Conditional Layout prop (for reusable application layout or route-driven components live Nav)
 */
function setupRouterWrappers<
  Key extends string,
  State extends Record<string, any>,
  Params extends string
>(
  {
    routes,
    Layout, //useState
  }: RouterProps<Key, State, Params>,
  ref: React.MutableRefObject<JSX.Element | null>,
  inRouterAlready: boolean
) {
  if (ref.current) return;

  const router = (
    <IndexRouter
      {...{
        routes: routes as any, //TODO: Fix cast, for some reasaon DynamicPaaramaRoute is potentially unknown???
      }}
    />
  );

  // If a Layout has been defined for state or style, then wrap the router in it.
  const conditionallyWrappedInLayoutRouter = Layout ? (
    <Layout>{router}</Layout>
  ) : (
    router
  );

  // Setup the RouteManagerContext, accessible by the Layout wrapper
  const wrappedInRouteManagerContext = (
    <RouteManagerContextProvider<Key, State, Params>
      useState={() => {
        // TODO: Real state
        return {} as State;
      }}
      routes={
        routes as any // TODO: Fix cast
      }
    >
      {conditionallyWrappedInLayoutRouter}
    </RouteManagerContextProvider>
  );

  // If necessary, wrap the router in the BrowserProvider
  if (inRouterAlready) {
    ref.current = wrappedInRouteManagerContext;
  } else {
    ref.current = (
      <BrowserProvider>{wrappedInRouteManagerContext}</BrowserProvider>
    );
  }
}

type ParamOfRoutes<
  Key extends string,
  AppState extends Record<string, any>,
  ParamKeys extends string
> = ParameterizedRoute<Key, ParamKeys, AppState>['params'];

class Router<
  Key extends string,
  AppState extends Record<string, any>,
  ParamKeys extends string
> {
  /**
   * Typesafe Link component for use in the Application that will autosuggest `to` and `props` (hopefully)
   */
  public readonly Link: typeof SafeLink<
    KeyOfRoutes<Key, AppState>,
    Record<ParamKeys, any>
  >;

  constructor(
    /**
     * Routes for a router are an array of Static and ParameterizedRoutes
     */
    public readonly routes: (
      | StaticRoute<Key, AppState>
      | ParameterizedRoute<Key, ParamKeys, AppState>
    )[],
    public readonly Layout?: React.FC<PropsWithChildren>
  ) {
    this.Link = SafeLink;
  }

  public useRouterContext() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useContext(
      RouteManagerContext as any as React.Context<
        RouteManagerState<Key, AppState, ParamKeys>
      >
    );
  }

  /**
   * `generate` is used for an applications router file.
   * Use this to generate type-safe router methods based on the application routes
   */
  static generate<
    Key extends string,
    State extends Record<string, any>,
    ParamKeys extends string
  >({
    routes,
    Layout,
    useState,
  }: {
    /**
     * Routes are an array of Static and Parameterized routes
     */
    routes: (
      | StaticRoute<Key, State>
      | ParameterizedRoute<Key, ParamKeys, State>
    )[];
    Layout?: React.FC<PropsWithChildren>;
    useState: () => State;
  }) {
    return new Router(routes, Layout);
  }

  /**
   * Router Component to be used in the application
   */
  public Component = () => {
    // const router = useRoutes(this.routes as RouteObject[]);
    // We don't want to keep rerendering the router, so will use a ref
    const wrappedOrUnwrappedRouter = useRef<JSX.Element | null>(null);
    const inRouterAlready = useInRouterContext();

    setupRouterWrappers(
      this as any, // TODO: Fix cast, DynamicParamRoute with unknown from Path
      wrappedOrUnwrappedRouter,
      inRouterAlready
    );

    return wrappedOrUnwrappedRouter.current ?? <p>Loading</p>;
  };
}

export default Router;

//
//
//
//
//
//
//
//

const BASE_ROUTE = {
  importComponent: () => Promise.resolve({ default: () => <p>test</p> }),
  useTitle() {
    return 'computed title from hook';
  },
} as const;

const NOT_FOUND = Route.create({
  ...BASE_ROUTE,
  key: 'Not Found Page',
  path: '*',
});
const USER_PROFILE = Route.create({
  ...BASE_ROUTE,
  key: 'Users - User Profile',
  path: 'profile/:id',
  params: {
    id: 'test',
  },
});
const USERS = Route.create({
  ...BASE_ROUTE,
  key: 'Users',
  path: '/users',
  children: [USER_PROFILE],
});
const SETTINGS = Route.create({
  ...BASE_ROUTE,
  key: 'Settings',
  path: '/settings/:setting',
  params: {
    setting: 'something',
  },
});

const { Link } = Router.generate({
  routes: [USERS, SETTINGS, NOT_FOUND],
  useState() {
    return {};
  },
});

const SomeThingWithTypesafeLink = () => (
  <>
    <Link to="Not Found Page" setting={'test'} />
    <Link to="Users - User Profile"  />
  </>
);
