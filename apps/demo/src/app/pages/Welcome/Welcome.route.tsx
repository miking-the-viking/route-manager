import { Route } from '@route-manager/react';

const WELCOME_ROUTE = Route.create({
  path: '*',
  useTitle() {
    const date = new Date();
    const hours = date.getHours();
    const time = `${hours}:${date.getMinutes()}:${date.getSeconds()}${
      hours > 12 ? 'pm' : 'am'
    }`;

    return `${time} Welcome`;
  },
  importComponent: () => import('./Welcome'),
});

export default WELCOME_ROUTE;
