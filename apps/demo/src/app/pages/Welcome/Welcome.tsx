import React from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div>
      <p>Welcome</p>
      <Link to={'/about'}>About</Link>
    </div>
  );
};

export default Welcome;
