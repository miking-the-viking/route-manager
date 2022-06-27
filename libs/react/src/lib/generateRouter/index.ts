import Route from '../Route/Route';
import RouteManagerContextGenerator from '../RouteManagerContext/RouteManagerContextGenerator';
import RouterProps from '../types/RouterProps';

/**
 * `generateRouter` is the type-safe entrypoint for generating a router for an application
 */
function generateRouter<State extends Record<string, any>>({
  routes,
  Layout,
}: RouterProps<State>) {
  const {
    RouteEvaluationWrapper,
    RouteManagerConsumer,
    RouteManagerContext,
    useRouteManagerContext,
    useRouteRedirectCheck,
  } = RouteManagerContextGenerator<State>({
    routes,
    state: {} as State, // TODO: Review this
  });

  return {
    RouteEvaluationWrapper,
    RouteManagerConsumer,
    RouteManagerContext,
    useRouteManagerContext,
    useRouteRedirectCheck,
  };
}

export default generateRouter;
