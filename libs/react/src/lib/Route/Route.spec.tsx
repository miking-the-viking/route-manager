import Route, { AbstractRoute, ParameterizedRoute, StaticRoute } from './Route';

const importComponent = (content: string) => () =>
  Promise.resolve(() => <p>{content}</p>);

const STATIC_ROUTE = Route.create({
  key: 'static route',
  path: '*',
  useTitle() {
    return 'static route';
  },
  importComponent: importComponent('static route'),
});

const PARAMETERIZED_ROUTE = Route.create({
  key: 'parameterized route',
  path: ':param1/separator/:param2',
  useTitle() {
    return 'paramaterized route';
  },
  importComponent: importComponent('paramaterized route'),
});

describe('Route class', () => {
  describe('create', () => {
    it('returns an instance of Route', () => {
      expect(STATIC_ROUTE).toBeInstanceOf(AbstractRoute);
      expect(StaticRoute.isStaticRoute(STATIC_ROUTE)).toBeTruthy();

      expect(PARAMETERIZED_ROUTE).toBeInstanceOf(AbstractRoute);
      expect(
        ParameterizedRoute.isParameterizedRoute(PARAMETERIZED_ROUTE)
      ).toBeTruthy();
    });

    describe('path', () => {
      describe('when no params are defined', () => {
        it('path can be an unrestricted string', () => {
          const BASE_ROUTE_PARAMS = {
            key: 'static route',
            useTitle() {
              return 'static route';
            },
            importComponent: importComponent('static route'),
          } as const;

          // No type errors, path can be string since no params are defined
          expect(
            Route.create({ ...BASE_ROUTE_PARAMS, path: '*' })
          ).toBeInstanceOf(ParameterizedRoute);
          expect(
            Route.create({ ...BASE_ROUTE_PARAMS, path: 'some/bunch/of/paths' })
          ).toBeInstanceOf(ParameterizedRoute);
        });
      });

      describe('when params are defined', () => {
        it('path is restricted to parameterizing all the defined parameters (such as `:{key}`)', () => {
          const BASE_ROUTE_PARAMS = {
            key: 'parameterized route',
            useTitle() {
              return 'parameterized route';
            },
            importComponent: importComponent('parameterized route'),
          } as const;
          expect(
            Route.create({
              ...BASE_ROUTE_PARAMS,
              path: ':param1/:param2',
              params: {
                param1: 'test',
                param2: 'test',
              },
            })
          );
          // Type error because path is not including :test anywhere
          // expect(
          //   Route.create({
          //     ...BASE_ROUTE_PARAMS,
          //     path: '*',
          //     params: {
          //       test: 'something',
          //     },
          //   })
          // ).toBeInstanceOf(Route);
        });
      });
    });
  });

  describe('wrapping the default imported component with lazyElement', () => {
    it.todo(
      'Wraps the default exprt of the importComponent in a RouteWrapper connecting the Route and Compoment'
    );
  });

  describe('rules', () => {
    it.todo('test');
  });
});
