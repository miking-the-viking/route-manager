import { PropsWithChildren } from 'react';
import { RouteObject } from 'react-router-dom';
import Route from '../Route/Route';

type RouterProps<State extends Record<string, any>> = {
  /**
   * All Routes for the SPA
   */
  routes: Route<State>[];
  /**
   * Optional Layout component, will have access to router hooks
   *
   * Ideal for Application-wide Layout and Nav where router state drives the behavior
   */
  Layout?: React.FC<PropsWithChildren>;
};

export default RouterProps;
