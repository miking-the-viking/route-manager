import Route from './Route';

const importComponent = (content: string) => () =>
  Promise.resolve(() => <p>{content}</p>);

const StaticRoute = Route.create({
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
      expect(StaticRoute).toBeInstanceOf(Route);
      expect(ParameterizedRoute).toBeInstanceOf(Route);
    });

    describe('path', () => {
      describe('when no params are defined', () => {
        it.todo('path can be an unrestricted string');
      });

      describe('when params are defined', () => {
        it.todo(
          'path is restricted to parameterizing all the defined parameters (such as `:{key}`)'
        );
      });
    });
  });
});
