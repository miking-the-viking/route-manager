import { Helmet } from 'react-helmet-async';
import ParameterizedRoute from '../../Route/ParameterizedRoute/ParameterizedRoute';
import Route from '../../Route/Route';
import StaticRoute from '../../Route/StaticRoute/StaticRoute';
import useRedirectCheck from './hooks/useRedirectCheck';

/**
 * RouteWrapper is a function used to bind the Route configuration object to its Page component.
 *
 * This handles applying any automatic redirect rules as necessary, defined by the Route config.
 *
 */
const RouteWrapper =
  <
    Key extends string,
    State extends Record<string, any>,
    ParamKeys extends string
  >(
    route: StaticRoute<Key, State> | ParameterizedRoute<Key, ParamKeys, State>,
    Component: any
  ) =>
  () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const useRedirectCheckResult = useRedirectCheck(route);
    console.log('useRedirectCheckResult = ', useRedirectCheckResult);
    // TODO: check redirects

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const params = useParams();
    //   console.log('hey');

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const title =
      typeof route.useTitle === 'string' ? route.useTitle : route.useTitle();

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

export default RouteWrapper;
