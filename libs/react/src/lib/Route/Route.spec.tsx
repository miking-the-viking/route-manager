import Route, { StaticRoute } from './Route';

const importComponent = (content: string) => () =>
  Promise.resolve(() => <p>{content}</p>);

const staticRoute = Route.create({
  key: 'static route',
  path: '*',
  useTitle() {
    return 'static route';
  },
  importComponent: importComponent('static route'),
});

const ParameterizedRoute = Route.create({
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
      expect(staticRoute).toBeInstanceOf(StaticRoute);
      expect(ParameterizedRoute).toBeInstanceOf(Route);
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
          ).toBeInstanceOf(Route);
          expect(
            Route.create({ ...BASE_ROUTE_PARAMS, path: 'some/bunch/of/paths' })
          ).toBeInstanceOf(Route);
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

          // Type error because path is not including :test anywhere
          expect(
            Route.create({
              ...BASE_ROUTE_PARAMS,
              path: '*',
              params: {
                test: 'something',
              },
            })
          ).toBeInstanceOf(Route);
        });
      });
    });
  });
});
