import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Route from '../Route/Route';

/**
 * RouteEvaluationWrapper is a function used to bind the Route configuration object to its Page component.
 *
 * This handles applying any automatic redirect rules as necessary, defined by the Route config.
 *
 *
 * @param route
 * @param Component
 * @param Wrapper Optional wrapper than can enclose the page component for more specific page context.
 */
const RouteEvaluationWrapper =
  <State extends Record<string, any>>(route: Route<State>, Component: any) =>
  () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const loadingState = useRouteRedirectCheck(route);
    // TODO: check redirects

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const params = useParams();
    //   console.log('hey');

    const title = useMemo(() => {
      if (typeof route.title === 'string') return route.title;
      return route.title();
    }, []);

    const HelmetWrappedComponent = () => (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {/* Must not render the component unless the useRouteRedirectCheck returns true */}
        {/* {loadingState ? <Component /> : null} */}
        <Component />
      </>
    );

    return <HelmetWrappedComponent />;
  };

export default RouteEvaluationWrapper;
