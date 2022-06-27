import React from 'react';
import RouteManagerContext from '../RouteManagerContext';

/**
 *
 * Convenience hook for `useContext(RouteManagerContext)`
 */
const useRouteManagerContext = () => React.useContext(RouteManagerContext);

export default useRouteManagerContext;
