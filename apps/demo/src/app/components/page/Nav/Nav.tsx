import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../../context/Favourites/Color';

const Bar = styled.div`
    flex: 1;
    flex-grow
`;

const Nav: React.FC = () => {
  // TODO: Use type-safe Link from Router

  return (
    <Bar>
      {COLORS.map((col) => {
        return (
          <Link key={col} to={`/club/color/${col}`}>
            {col}
          </Link>
        );
      })}
    </Bar>
  );
};

export default Nav;
