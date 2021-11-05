import { Route } from '@route-manager/react';
import { PROFILE_ROUTE } from './Profile/Profile.route';
import USERS from './Users.symbol';

export const USERS_ROUTE = Route.Static({
  key: USERS,
  path: 'users',
  importComponent: () => import('./Users'),
  name: 'Users',
  children: [PROFILE_ROUTE],
});
