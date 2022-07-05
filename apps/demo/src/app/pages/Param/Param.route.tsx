import { Route } from '@route-manager/react';

const PARAM_ROUTE = Route.create({
  key: 'parameterized page',
  importComponent: () => import('./Param'),
  useTitle() {
    return 'parameterized';
  },
  params: {
    param1: 'test',
  },
  path: 'param/:param1',
});

export default PARAM_ROUTE;
