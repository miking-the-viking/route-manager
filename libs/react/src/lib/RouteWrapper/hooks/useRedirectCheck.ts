import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Route from '../../Route/Route';
import useRouteManagerContext from '../../RouteManagerContext/hooks/useRouteManagerContext';

/**
 * Convenience hook used to check a Route config against the current Router state,
 * redirecting if the rules fail.
 *
 * @param route
 */
function useRedirectCheck<RouterState extends Record<string, unknown> = any>(
  route: Route<RouterState>
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
