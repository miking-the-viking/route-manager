import React from 'react';
import { RouteObject } from 'react-router';
import About from './pages/About/About';
import Welcome from './pages/Welcome/Welcome';

const routes: RouteObject[] = [
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '/about',
    element: <About />,
  },
];

export default routes;
