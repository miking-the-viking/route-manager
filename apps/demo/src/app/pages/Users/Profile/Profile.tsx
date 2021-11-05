import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

export default ({ id }) => {
  return (
    <div>
      <h1>Profile</h1>
      <p>id: {id}</p>
      <Outlet />
    </div>
  );
};
