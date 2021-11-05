import { Route } from '@route-manager/react';
import PROFILE from './Profile.symbol';
import { SEARCH_ROUTE } from './Search/Search.route';

import Users from '../USERS';

export const PROFILE_ROUTE = Route.Static({
  key: PROFILE,
  path: ':id/profile',
  importComponent: () => import('./Profile'),
  name: 'Profile',
  children: [SEARCH_ROUTE],
  slugs: async (state) => {
    return Users.map((u) => ({
      name: u.name,
      params: {
        id: u.name,
      },
    }));
  },
});
