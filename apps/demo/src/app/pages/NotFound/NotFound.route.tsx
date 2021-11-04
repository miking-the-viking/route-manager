import { Route } from '@route-manager/react';
import { NOT_FOUND } from './NotFound.symbol';

export const NOT_FOUND_ROUTE = Route.Static({
  key: NOT_FOUND,
  path: '404',
  importComponent: () => import('./NotFound'),
  name: 'Not Found',
  default: true,
  // default: true,
  //   icon: faQuestion,
  //   description: 'About this React Route Manager Demo App',
  //   collections: ['nav'],
});
