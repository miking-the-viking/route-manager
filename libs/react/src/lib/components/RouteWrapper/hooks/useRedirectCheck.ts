import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRouteManagerContext from '../../../contexts/RouteManagerContext/hooks/useRouteManagerContext';
import ParameterizedRoute from '../../../Route/ParameterizedRoute/ParameterizedRoute';
import Route from '../../../Route/Route';
import StaticRoute from '../../../Route/StaticRoute/StaticRoute';

/**
 * Convenience hook used to check a Route config against the current Router state,
 * redirecting if the rules fail.
 *
 * @param route
 */
function useRedirectCheck<
  Key extends string,
  RouterState extends Record<string, unknown>,
  ParamKeys extends string
>(
  route:
    | StaticRoute<Key, RouterState>
    | ParameterizedRoute<Key, ParamKeys, RouterState>
) {
  console.log('useRedirectCheck', route);
  const { state, checkRoute } = useRouteManagerContext();
  console.log('state', state);

  useEffect(() => {
    checkRoute(route);
  }, [checkRoute, route]);

  return null;
}

export default useRedirectCheck;
