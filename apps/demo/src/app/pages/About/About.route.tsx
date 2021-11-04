import { Route } from '@route-manager/react';
import { ABOUT } from './About.symbol';
import { SOMETHING_ROUTE } from './Something/Something.route';

export const ABOUT_ROUTE = Route.Static({
  key: ABOUT,
  path: 'about',
  importComponent: () => import('./About'),
  name: 'About',
  children: [SOMETHING_ROUTE],
  // default: true,
  //   icon: faQuestion,
  //   description: 'About this React Route Manager Demo App',
  //   collections: ['nav'],
});
