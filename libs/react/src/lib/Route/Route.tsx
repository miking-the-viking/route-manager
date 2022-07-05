import ParameterizedRoute, {
  ParameterizedRouteProps,
} from './ParameterizedRoute/ParameterizedRoute';
import StaticOrParameterizedRoute from './StaticOrParameterizedRoute';
import StaticRoute, { StaticRouteProps } from './StaticRoute/StaticRoute';

class Route {
  /**
   * Create a Route instance from a RouteInput object
   */
  static create<
    Key extends string,
    ParamKeys extends string,
    State extends Record<string, any>
  >(
    route: ParameterizedRouteProps<Key, ParamKeys, State>
  ): ParameterizedRoute<Key, ParamKeys, State>;
  static create<
    Key extends string,
    Path extends string,
    State extends Record<string, any>
  >(route: StaticRouteProps<Key, State>): StaticRoute<Key, State>;
  static create(route: any): any {
    if (route.params) {
      console.log('ParameterizedRoute');
      return ParameterizedRoute.create(route);
    }
    return StaticRoute.create(route);
  }
}

// SCRATCH BELOW
// const FAKE_IMPORT_COMPONENT = () =>
//   Promise.resolve({ default: () => <p>test</p> });

// const SHARED = {
//   importComponent: FAKE_IMPORT_COMPONENT,
//   useTitle: () => 'computed page title',
// };

// // Allows for static route with `*` path
// const STATIC_STAR = Route.create({
//   ...SHARED,
//   key: 'static *',
//   path: '*',
// });

// // Allows for static route with `string` path
// const STATIC_STRING = Route.create({
//   ...SHARED,
//   key: 'static string',
//   path: 'scooby-dooby/doo',
// });

// // Allows for type-safe, parameterized `path` string literal using optionally defined `params`
// const PARAM = Route.create({
//   ...SHARED,
//   key: 'parameterized route',
//   params: {
//     param1: 'test',
//   },
//   path: ':param1',
// });

// // Error if missing defined parameters in path,
// const DUO_PARAM = Route.create({
//   importComponent: () => Promise.resolve({ default: () => <p>test</p> }),
//   useTitle() {
//     return 'page title';
//   },
//   key: 'parameterized route error',
//   params: {
//     param1: 'test',
//     param2: 'test',
//   },
//   path: ':param1/:param2',
// });

export default Route;
