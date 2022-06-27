import { Route } from '@route-manager/react';
import { useParams } from 'react-router-dom';
import FanOfColorParamRule from '../../../rules/FanOfColorParam/FanOfColorParam.rule';

/**
 * The ColorFans route is a sub-route of ColorClub (in the context of a :color param)
 *
 * Only accessible by fans of that color
 */
const COLOR_FANS_ROUTE = Route.create({
  path: 'fans',
  useTitle() {
    const { color } = useParams();
    return `Fans of ${color}`;
  },
  importComponent: () => import('./ColorFans'),
  rules: [FanOfColorParamRule],
});

export default COLOR_FANS_ROUTE;
