import { PropsWithChildren, useRef } from 'react';
import { useInRouterContext, useRoutes } from 'react-router-dom';
import BrowserProvider from '../BrowserProvider/BrowserProvider';
import IndexRouter from '../IndexRouter/IndexRouter';
import RouteManagerContextProvider from '../RouteManagerContext/RouteManagerContextProvider';
import RouterProps from '../types/RouterProps';

/**
 * Wrap the router in
 *  - Route Manager Context
 *  - Conditional BrowserProvider
 *  - Conditional Layout prop (for reusable application layout or route-driven components live Nav)
 */
function setupRouterWrappers<State extends Record<string, any>>(
  { routes, Layout }: RouterProps<State>,
  ref: React.MutableRefObject<JSX.Element | null>,
  inRouterAlready: boolean
) {
  if (ref.current) return;

  const router = <IndexRouter {...{ routes }} />;

  // If a Layout has been defined for state or style, then wrap the router in it.
  const conditionallyWrappedInLayoutRouter = Layout ? (
    <Layout>{router}</Layout>
  ) : (
    router
  );

  // Setup the RouteManagerContext, accessible by the Layout wrapper
  const wrappedInRouteManagerContext = (
    <RouteManagerContextProvider<State>
      state={
        // TODO: State
        {} as State
      }
      routes={routes}
    >
      {conditionallyWrappedInLayoutRouter}
    </RouteManagerContextProvider>
  );

  // If necessary, wrap the router in the BrowserProvider
  if (inRouterAlready) {
    ref.current = wrappedInRouteManagerContext;
  } else {
    ref.current = (
      <BrowserProvider>{wrappedInRouteManagerContext}</BrowserProvider>
    );
  }
}

/**
 * Returns a fully loaded Router for the given routes
 */
const useRouter = <State extends Record<string, any>>(
  props: RouterProps<State>
) => {
  // We don't want to keep rerendering the router, so will use a ref
  const wrappedOrUnwrappedRouter = useRef<JSX.Element | null>(null);
  const inRouterAlready = useInRouterContext();

  setupRouterWrappers(props, wrappedOrUnwrappedRouter, inRouterAlready);

  return wrappedOrUnwrappedRouter.current;
};

export default useRouter;
