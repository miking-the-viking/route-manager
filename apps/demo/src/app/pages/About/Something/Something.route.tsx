import { Route } from '@route-manager/react';
import { SOMETHING } from './Something.symbol';

export const SOMETHING_ROUTE = Route.Static({
  key: SOMETHING,
  path: 'something',
  importComponent: () => import('./Something'),
  name: 'Something',
});
