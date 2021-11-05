import { Route } from '@route-manager/react';
import SEARCH from './Search.symbol';

export const SEARCH_ROUTE = Route.Static({
  key: SEARCH,
  path: 'search/:searchkey',
  importComponent: () => import('./Search'),
  name: 'Search',
});
