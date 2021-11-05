import React from 'react';
import { Outlet } from 'react-router-dom';

export default () => {
  return (
    <div>
      <h1>Users</h1>

      <Outlet />
    </div>
  );
};
