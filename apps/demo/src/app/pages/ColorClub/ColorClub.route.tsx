import { Route } from '@route-manager/react';
import useFavouriteColor from '../../context/Favourites/hooks/useFavouriteColor';
import ColorFans from './ColorFans/ColorFans';
import COLOR_FANS_ROUTE from './ColorFans/ColorFans.route';

const COLOR_CLUB_ROUTE = Route.create({
  path: '/club/color/:color',
  useTitle() {
    const favourite = useFavouriteColor();
    console.log('favourite is ', favourite);

    return `Color Club (yours is ${favourite})`;
  },
  importComponent: () => import('./ColorClub'),
  children: [COLOR_FANS_ROUTE],
});

export default COLOR_CLUB_ROUTE;
