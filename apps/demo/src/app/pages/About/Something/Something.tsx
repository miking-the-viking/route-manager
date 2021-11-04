import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <p>Something</p>
      <Link to={'/about'}>go to root about</Link>
    </div>
  );
};
