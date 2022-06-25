import { RouteObject } from 'react-router-dom';
import COLOR_CLUB_ROUTE from './pages/ColorClub/ColorClub.route';
import NOT_FOUND_ROUTE from './pages/NotFound/NotFound.route';
import WELCOME_ROUTE from './pages/Welcome/Welcome.route';

const ROUTES: RouteObject[] = [
  WELCOME_ROUTE,
  COLOR_CLUB_ROUTE,
  NOT_FOUND_ROUTE,
];

export default ROUTES;
