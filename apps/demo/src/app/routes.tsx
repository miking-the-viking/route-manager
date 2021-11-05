import { createRouter } from '@route-manager/react';
import React from 'react';
import { Navigate, RouteObject } from 'react-router';
import About from './pages/About/About';
import { ABOUT_ROUTE } from './pages/About/About.route';
import { NOT_FOUND_ROUTE } from './pages/NotFound/NotFound.route';
import Welcome from './pages/Welcome/Welcome';
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

const routes = [
  WELCOME_ROUTE,
  ABOUT_ROUTE,
  NOT_FOUND_ROUTE,
  //   {
  //     path: '*',
  //     element: <Navigate to={'/welcome'} />,
  //   },
];


/**
 * Intellisense will be like 
  const Link: React.FC<LinkProps & React.RefAttributes<HTMLAnchorElement> & {
    to: "Welcome" | "About";
  }>
 */
export const { Link } = createRouter([WELCOME_ROUTE, ABOUT_ROUTE]);

export default routes;
