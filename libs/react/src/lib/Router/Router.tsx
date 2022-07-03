import { State } from 'history';
import { Key, PropsWithChildren, ReactElement } from 'react';
import SafeLink from '../components/SafeLink/SafeLink';
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

class Router<
  Key extends string,
  AppState extends Record<string, any>,
  ParamKeys extends string
> {
  /**
   * Typesafe Link component for use in the Application that will autosuggest `to` and `props` (hopefully)
   */
  public readonly Link: typeof SafeLink<KeyOfRoutes<Key, AppState>>;

  constructor(
    /**
     * Routes for a router are an array of Static and ParameterizedRoutes
     */
    public readonly routes: (
      | StaticRoute<Key, AppState>
      | ParameterizedRoute<Key, ParamKeys, AppState>
    )[],
    public readonly Layout?: React.FC
  ) {
    this.Link = SafeLink;
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
  }: {
    /**
     * Routes are an array of Static and Parameterized routes
     */
    routes: (
      | StaticRoute<Key, State>
      | ParameterizedRoute<Key, ParamKeys, State>
    )[];
    Layout?: React.FC<PropsWithChildren>;
  }) {
    return new Router(routes, Layout);
  }
}

export default Router;

const BASE_ROUTE = {
  importComponent: () => Promise.resolve({ default: () => <p>test</p> }),
  useTitle() {
    return 'computed title from hook';
  },
} as const;
const ROUTE_1 = Route.create({
  ...BASE_ROUTE,
  key: 'route 1 key',
  path: '*',
});
const ROUTE_2 = Route.create({
  ...BASE_ROUTE,
  key: 'route 2 key',
  path: 'route 2',
  children: [ROUTE_1],
});
const ROUTE_3 = Route.create({
  ...BASE_ROUTE,
  key: 'route 3 key',
  path: ':param1/:param2', // must include both :param1 and :param2
  params: {
    param1: 'test',
    param2: 'other test',
  },
});

const { Link } = Router.generate({
  routes: [ROUTE_1, ROUTE_2, ROUTE_3],
});

const SomeThingWithTypesafeLink = () => (
  <>
    <Link to="route 3 key" />
    <Link to="route 1 key" />
  </>
);
