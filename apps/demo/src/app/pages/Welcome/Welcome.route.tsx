import { Route } from '@route-manager/react';

function currentTime() {
  const date = new Date();
  const hours = date.getHours();
  return `${hours}:${date.getMinutes()}:${date.getSeconds()}${
    hours > 12 ? 'pm' : 'am'
  }`;
}

const WELCOME_ROUTE = Route.create({
  key: 'welcome',
  path: '*',
  useTitle() {
    return `${currentTime()} Welcome`;
  },
  importComponent: () => import('./Welcome'),
});

export default WELCOME_ROUTE;
