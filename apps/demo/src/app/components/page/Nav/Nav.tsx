// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useRouteManagerContext from '../../../../../../../libs/react/src/lib/contexts/RouteManagerContext/hooks/useRouteManagerContext';
import { COLORS } from '../../../context/Favourites/Color';
import router from '../../../router';

const Bar = styled.div`
    flex: 1;
    flex-grow
`;

const Nav: React.FC = () => {
  // TODO: Use type-safe Link from Router
  const { Link } = router;

  return (
    <Bar>
      {COLORS.map((col) => {
        return (
          // <Link key={col} to={`/club/color/${col}`}>
          //   {col}
          // </Link>
          <Link key={col} to={'Colorr Club'}>
            {col}
          </Link>
        );
      })}
    </Bar>
  );
};

export default Nav;
