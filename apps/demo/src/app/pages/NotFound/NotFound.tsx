import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <p>NotFound</p>
      <Link to={'/about'}>About</Link>
    </div>
  );
};
