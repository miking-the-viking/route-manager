import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useRouteManagerContext from '../../../contexts/RouteManagerContext/hooks/useRouteManagerContext';
import Route from '../../../Route/Route';

/**
 * Convenience hook used to check a Route config against the current Router state,
 * redirecting if the rules fail.
 *
 * @param route
 */
function useRedirectCheck<
  Key extends string,
  RouterState extends Record<string, unknown> = any
>(route: Route<Key, RouterState>) {
  console.log('useRedirectCheck', route);
  const { state, checkRoute } = useRouteManagerContext();
  console.log('state', state);

  useEffect(() => {
    checkRoute(route);
  }, [checkRoute, route]);

  return null;
}

export default useRedirectCheck;
