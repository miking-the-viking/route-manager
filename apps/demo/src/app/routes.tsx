import { Route } from '@route-manager/react';
import { RouteObject } from 'react-router-dom';
import { ABOUT_ROUTE } from './pages/About/About.route';
import { NOT_FOUND_ROUTE } from './pages/NotFound/NotFound.route';
import { USERS_ROUTE } from './pages/Users/Users.route';
import { WELCOME_ROUTE } from './pages/Welcome/Welcome.route';

// const routes: RouteObject[] = [
//   {
//     path: '/welcome',
//     element: <Welcome />,
//   },
//   {
//     path: '/about',
//     element: <About />,
//   },
// ];

const routes: Route<unknown>[] = [
  WELCOME_ROUTE,
  ABOUT_ROUTE,
  USERS_ROUTE,
  // Fallback Option 1: Can define a "default: true" route which will be the '*' automagically
  NOT_FOUND_ROUTE,
  // Fallback Option 2: Can manually define a fallback route with a '*'
  // {
  //   path: '*',
  //   element: <Navigate to={'/welcome'} />,
  // },
  // Fallback Option 3: If there is a '/' route defined, will be considered default fallback
  // Fallback Option 4: Run as-is (no matches)
];

export default routes;
