import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default () => {
  return (
    <div>
      <p>About</p>
      <p>
        <Link to={'/welcome'}>Welcome</Link>
      </p>
      <p>
        <Link to={'/about/something'}>something</Link>
      </p>
      <Outlet />
    </div>
  );
};
