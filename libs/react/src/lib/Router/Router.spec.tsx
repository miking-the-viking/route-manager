import Route from '../Route/Route';
import Router from './Router';

const ROUTE_1 = Route.create({
  key: `route1`,
  path: `route_1`,
  importComponent: () => Promise.resolve(() => <p>1</p>),
  useTitle() {
    return 'route 1';
  },
});
const ROUTE_2 = Route.create({
  key: `route2`,
  path: `route_2`,
  importComponent: () => Promise.resolve(() => <p>2</p>),
  useTitle() {
    return 'route 2';
  },
});

// nested routes
const ROUTE_3_1_2_3_4_5_6_7_8_9_10_11_12 = Route.create({
  key: `route-3-1-2-3-4-5-6-7-8-9-10-11-12`,
  path: `route_3-1-2-3-4-5-6-7-8-9-10-11-12`,
  importComponent: () =>
    Promise.resolve(() => <p>3-1-2-3-4-5-6-7-8-9-10-11-12</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5-6-7-8-9-10-11-12';
  },
});
const ROUTE_3_1_2_3_4_5_6_7_8_9_10_11 = Route.create({
  key: `route-3-1-2-3-4-5-6-7-8-9-10-11`,
  path: `route_3-1-2-3-4-5-6-7-8-9-10-11`,
  importComponent: () =>
    Promise.resolve(() => <p>3-1-2-3-4-5-6-7-8-9-10-11</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5-6-7-8-9-10-11';
  },
  children: [ROUTE_3_1_2_3_4_5_6_7_8_9_10_11_12],
});
const ROUTE_3_1_2_3_4_5_6_7_8_9_10 = Route.create({
  key: `route-3-1-2-3-4-5-6-7-8-9-10`,
  path: `route_3-1-2-3-4-5-6-7-8-9-10`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3-4-5-6-7-8-9-10</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5-6-7-8-9-10';
  },
  children: [ROUTE_3_1_2_3_4_5_6_7_8_9_10_11],
});
const ROUTE_3_1_2_3_4_5_6_7_8_9 = Route.create({
  key: `route-3-1-2-3-4-5-6-7-8-9`,
  path: `route_3-1-2-3-4-5-6-7-8-9`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3-4-5-6-7-8-9</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5-6-7-8-9';
  },
  children: [ROUTE_3_1_2_3_4_5_6_7_8_9_10],
});
const ROUTE_3_1_2_3_4_5_6_7_8 = Route.create({
  key: `route-3-1-2-3-4-5-6-7-8`,
  path: `route_3-1-2-3-4-5-6-7-8`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3-4-5-6-7-8</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5-6-7-8';
  },
  children: [ROUTE_3_1_2_3_4_5_6_7_8_9],
});
const ROUTE_3_1_2_3_4_5_6_7 = Route.create({
  key: `route-3-1-2-3-4-5-6-7`,
  path: `route_3-1-2-3-4-5-6-7`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3-4-5-6-7</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5-6-7';
  },
  children: [ROUTE_3_1_2_3_4_5_6_7_8],
});
const ROUTE_3_1_2_3_4_5_6 = Route.create({
  key: `route-3-1-2-3-4-5-6`,
  path: `route_3-1-2-3-4-5-6`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3-4-5-6</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5-6';
  },
  children: [ROUTE_3_1_2_3_4_5_6_7],
});
const ROUTE_3_1_2_3_4_5 = Route.create({
  key: `route-3-1-2-3-4-5`,
  path: `route_3-1-2-3-4-5`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3-4-5</p>),
  useTitle() {
    return 'route 3-1-2-3-4-5';
  },
  children: [ROUTE_3_1_2_3_4_5_6],
});
const ROUTE_3_1_2_3_4 = Route.create({
  key: `route-3-1-2-3-4`,
  path: `route_3-1-2-3-4`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3-4</p>),
  useTitle() {
    return 'route 3-1-2-3-4';
  },
  children: [ROUTE_3_1_2_3_4_5],
});
const ROUTE_3_1_2_3 = Route.create({
  key: `route-3-1-2-3`,
  path: `route_3-1-2-3`,
  importComponent: () => Promise.resolve(() => <p>3-1-2-3</p>),
  useTitle() {
    return 'route 3-1-2-3';
  },
  children: [ROUTE_3_1_2_3_4],
});
const ROUTE_3_1_2 = Route.create({
  key: `route-3-1-2`,
  path: `route_3-1-2`,
  importComponent: () => Promise.resolve(() => <p>3-1-2</p>),
  useTitle() {
    return 'route 3-1-2';
  },
  children: [ROUTE_3_1_2_3],
});
const ROUTE_3_1 = Route.create({
  key: `route-3-1`,
  path: `route_3-1`,
  importComponent: () => Promise.resolve(() => <p>3-1</p>),
  useTitle() {
    return 'route 3-1';
  },
  children: [ROUTE_3_1_2],
});

const ROUTE_3 = Route.create({
  key: `route3`,
  path: `route_3`,
  importComponent: () => Promise.resolve(() => <p>3</p>),
  useTitle() {
    return 'route 3';
  },
  children: [ROUTE_3_1],
});

describe('Router class', () => {
  describe('generate', () => {
    it('generates a router', () => {
      expect(Router.generate([])).toBeInstanceOf(Router);
    });
  });

  describe('Link', () => {
    describe('to prop', () => {
      describe('known routes', () => {
        it('provides recommendations for known route keys, base routes and nested children routes', () => {
          const { Link } = Router.generate([ROUTE_1, ROUTE_2, ROUTE_3]);
          Link({ to: 'route1' });
          Link({ to: 'route2' });
          Link({ to: 'route3' });
          Link({ to: 'route-3-1' });
          Link({ to: 'route-3-1-2' });
          Link({ to: 'route-3-1-2-3' });
          Link({ to: 'route-3-1-2-3-4' });
          Link({ to: 'route-3-1-2-3-4-5' });
          Link({ to: 'route-3-1-2-3-4-5-6' });
          Link({ to: 'route-3-1-2-3-4-5-6-7-8-9-10-11-12' });

          // Try out the following route, it will have a typescript compilation error due to being an unsupported string literal
          Link({ to: 'route-3-1-2-3-4-5-6-7-8-9-10-11-12-13' });
        });

        it.todo('Runtime error if the `to` doesnt match any Routes');
      });
    });
    describe('params', () => {
      describe('if params are defined', () => {
        it.todo('then Link uses the routes params for the `params` prop');
      });
    });
  });
});
