import StaticOrParameterizedRoute from './StaticOrParameterizedRoute';

class Route {
  /**
   * Create a Route instance from a RouteInput object
   */
  static create = StaticOrParameterizedRoute.create;
}

const FAKE_IMPORT_COMPONENT = () =>
  Promise.resolve({ default: () => <p>test</p> });

const SHARED = {
  importComponent: FAKE_IMPORT_COMPONENT,
  useTitle: () => 'computed page title',
};

// Allows for static route with `*` path
Route.create({
  ...SHARED,
  key: 'static *',
  path: '*',
});

// Allows for static route with `string` path
Route.create({
  ...SHARED,
  key: 'static string',
  path: 'scooby-dooby/doo',
});

// Allows for type-safe, parameterized `path` string literal using optionally defined `params`
Route.create({
  ...SHARED,
  key: 'parameterized route',
  params: {
    param1: 'test',
  },
  path: ':param1',
});

// Error if missing defined parameters in path,
// Route.create({
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
