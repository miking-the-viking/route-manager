import { Route } from '@route-manager/react';
import { useLocation, useParams } from 'react-router-dom';

const NOT_FOUND_ROUTE = Route.create({
  key: 'not found',
  path: '*',
  useTitle() {
    console.log('Evaluating NOT_FOUND_ROUTE title');
    const { pathname } = useLocation();
    return `"${pathname}" Not Found`;
  },
  importComponent: () => import('./NotFound'),
});

export default NOT_FOUND_ROUTE;
