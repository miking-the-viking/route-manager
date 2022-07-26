import { Route } from '@route-manager/react';
import ParameterizedRoute from 'libs/react/src/lib/Route/ParameterizedRoute/ParameterizedRoute';
import StaticRoute from 'libs/react/src/lib/Route/StaticRoute/StaticRoute';
import { PropsWithChildren } from 'react';
import Color from './context/Favourites/Color';
import COLOR_CLUB_ROUTE from './pages/ColorClub/ColorClub.route';
import NOT_FOUND_ROUTE from './pages/NotFound/NotFound.route';
import PARAM_ROUTE from './pages/Param/Param.route';
import WELCOME_ROUTE from './pages/Welcome/Welcome.route';

const ROUTES = [WELCOME_ROUTE, COLOR_CLUB_ROUTE, NOT_FOUND_ROUTE, PARAM_ROUTE];

export default ROUTES;

/**
 * Using Contravariance to narrow down all to Parameterized
 */
type ParameterizedRoutes<
  K extends string,
  S extends Record<string, any>,
  P extends string,
  RoutesType extends StaticRoute<K, S> | ParameterizedRoute<K, P, S>
> = (
  RoutesType extends any ? (x: ParameterizedRoute<K, P, S>) => void : never
) extends (x: infer I) => void
  ? I
  : never;

function generateRouter<
  K extends string,
  S extends Record<string, any>,
  P extends string,
  RoutesType extends StaticRoute<K, S> | ParameterizedRoute<K, P, S>
>(routes: RoutesType[]) {
  const Link: React.FC<
    PropsWithChildren<
      RoutesType extends ParameterizedRoute<K, P, S>
        ? {
            to: RoutesType['key'];
          } & RoutesType['params']
        : {
            to: RoutesType['key'];
          }
    >
  > = ({ to, ...params }) => <p>to: {to}</p>;

  return { Link };
}

const { Link } = generateRouter(ROUTES);

Link({
  to: 'parameterized page',
  param1: 'test',
});

Link({
  to: 'welcome',
});
