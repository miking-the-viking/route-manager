import { Route } from '@route-manager/react';
import useFavouriteColor from '../../context/Favourites/hooks/useFavouriteColor';

const COLOR_CLUB_ROUTE = Route.create({
  path: '/club/color/:color',
  title() {
    const favourite = useFavouriteColor();

    return `Color Club (yours is ${favourite})`;
  },
  importComponent: () => import('./ColorClub'),
});

export default COLOR_CLUB_ROUTE;
