import { PropsWithChildren } from 'react';
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

  /**
   * Application-defined hook for the Route Manager to use to compute the current application's state
   *
   * *Treat like a reducer
   */
  useState: () => State;
};

export default RouterProps;
