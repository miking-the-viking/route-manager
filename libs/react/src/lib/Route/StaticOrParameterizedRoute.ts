import ParameterizedRoute from './ParameterizedRoute/ParameterizedRoute';
import StaticRoute from './StaticRoute/StaticRoute';

const StaticOrParameterizedRoute: typeof StaticRoute &
  typeof ParameterizedRoute = ParameterizedRoute as any;

export default StaticOrParameterizedRoute;
