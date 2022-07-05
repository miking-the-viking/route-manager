import { useRef } from 'react';
import { useInRouterContext } from 'react-router-dom';
import BrowserProvider from '../components/BrowserProvider/BrowserProvider';
import IndexRouter from '../components/IndexRouter/IndexRouter';
import RouteManagerContextProvider from '../contexts/RouteManagerContext/RouteManagerContextProvider';
import { RouterProps } from '../Router/Router';

/**
 * Wrap the router in
 *  - Route Manager Context
 *  - Conditional BrowserProvider
 *  - Conditional Layout prop (for reusable application layout or route-driven components live Nav)
 */
function setupRouterWrappers<
  Key extends string,
  State extends Record<string, any>,
  Params extends string
>(
  {
    routes,
    Layout, //useState
  }: RouterProps<Key, State, Params>,
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
    <RouteManagerContextProvider<Key, State, Params>
      // useState={useState}
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
const useRouter = <
  Key extends string,
  State extends Record<string, any>,
  Params extends string
>(
  props: RouterProps<Key, State, Params>
) => {
  // We don't want to keep rerendering the router, so will use a ref
  const wrappedOrUnwrappedRouter = useRef<JSX.Element | null>(null);
  const inRouterAlready = useInRouterContext();

  setupRouterWrappers(props, wrappedOrUnwrappedRouter, inRouterAlready);

  return wrappedOrUnwrappedRouter.current ?? <p>Loading</p>;
};

export default useRouter;
