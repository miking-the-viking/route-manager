import { Link as OgLink } from 'react-router-dom';
import styled from 'styled-components';
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
          <>
            <OgLink key={col} to={`/club/color/${col}`}>
              {col}
            </OgLink>
            <Link key={col} to={'Colorr Club'} color={col}>
              {col}
            </Link>
            {/* Not FOund link should NOT require color prop. */}
            <Link
              key={col + 'notfound'}
              to={'not found'}
              // color={col} // not want
            >
              Not Found
            </Link>
          </>
        );
      })}
    </Bar>
  );
};

export default Nav;
