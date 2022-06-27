import { useRef } from 'react';
import { useInRouterContext, useRoutes } from 'react-router-dom';
import BrowserProvider from '../BrowserProvider/BrowserProvider';
import RouterProps from '../types/RouterProps';

const Router = <State extends Record<string, any>>({
  routes,
}: RouterProps<State>) => {
  const router = useRoutes(routes);
  return router;
};

/**
 * Wrap the router in
 *  - Conditional BrowserProvider
 *  - Conditional Layout prop (for reusable application layout or route-driven components live Nav)
 */
function setupRouterWrappers<State extends Record<string, any>>(
  { routes, Layout }: RouterProps<State>,
  ref: React.MutableRefObject<JSX.Element | null>,
  inRouterAlready: boolean
) {
  if (ref.current) return;

  const router = <Router {...{ routes }} />;

  // If a Layout has been defined for state or style, then wrap the router in it.
  const conditionallyWrappedInLayoutRouter = Layout ? (
    <Layout>{router}</Layout>
  ) : (
    router
  );

  // If necessary, wrap the router in the BrowserProvider
  if (inRouterAlready) {
    ref.current = conditionallyWrappedInLayoutRouter;
  } else {
    ref.current = (
      <BrowserProvider>{conditionallyWrappedInLayoutRouter}</BrowserProvider>
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
