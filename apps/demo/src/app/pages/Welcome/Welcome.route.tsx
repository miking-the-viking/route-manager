import { Route } from '@route-manager/react';
import { WELCOME } from './Welcome.symbol';

export const WELCOME_ROUTE = Route.Static({
  key: WELCOME,
  path: '/',
  importComponent: () => import('./Welcome'),
  name: 'Welcome',
  //   description: 'Main Welcome page for all visitors',
  //   icon: faHandMiddleFinger,
  //   collections: ['nav'],
});
