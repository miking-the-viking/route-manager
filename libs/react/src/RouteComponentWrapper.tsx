/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Route from './Route';

/**
 * RouterMetaWrap is a function used to bind the Route configuration object to its Page component.
 *
 * This handles applying any automatic redirect rules as necessary, defined by the Route config.
 *
 *
 * @param route
 * @param Component
 * @param Wrapper Optional wrapper than can enclose the page component for more specific page context.
 */
const RouteComponentWrapper = <RouterState extends Record<string, any>>(
  route: Route<RouterState>,
  Component: any
) => () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const loadingState = useRouteRedirectCheck(route);
  // TODO: check redirects

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();

  const HelmetWrappedComponent = () => (
    <>
      <Helmet>
        <title>{route.name}</title>
      </Helmet>
      {/* Must not render the component unless the useRouteRedirectCheck returns true */}
      {/* {loadingState ? <Component /> : null} */}
      <Component {...params} />
    </>
  );

  return <HelmetWrappedComponent />;
};

export default RouteComponentWrapper;
