// import { Route } from '@route-manager/react';
// import { useParams } from 'react-router-dom';
// import useFavouriteColor from '../../context/Favourites/hooks/useFavouriteColor';
// import COLOR_FANS_ROUTE from './ColorFans/ColorFans.route';

import { Route } from '@route-manager/react';
import { useParams } from 'react-router-dom';
import useFavouriteColor from '../../context/Favourites/hooks/useFavouriteColor';
import COLOR_FANS_ROUTE from './ColorFans/ColorFans.route';

const COLOR_CLUB_ROUTE = Route.create({
  key: 'Colorr Club',
  path: '/club/color/:color',
  params: {
    color: 'default todo',
  },
  useTitle() {
    const { color } = useParams();
    const favourite = useFavouriteColor();
    console.log('favourite is ', favourite);

    return `${color} Color Club (yours is ${favourite})`;
  },
  importComponent: () => import('./ColorClub'),
  // children: [COLOR_FANS_ROUTE],
});

export default COLOR_CLUB_ROUTE;
