import { BrowserProvider, useRouterProvider } from '@route-manager/react';
import React from 'react';
import routes from './routes';

/**
 * **RECOMMENDED**
 *
 * This approach automatically sets up the BrowserProvider(BrowserRouter & HelmetProvider)
 *
 * Simply grab the router from `useRouterProvider`, passing in the configurations of the application's Routes, and use that.
 *
 */
const AppWithAutoBrowserProvider = () => {
  const router = useRouterProvider(routes);

  return (
    <div>
      <h1>App</h1>
      {router}
    </div>
  );
};

/**
 * **NOT RECOMMENDED**
 *
 * This approach allows the app to set up the BrowserProvider(BrowserRouter & HelmetProvider)
 *
 */
const AppWithoutAutoBrowserProvider = () => {
  return (
    <BrowserProvider>
      <AppWithAutoBrowserProvider />
    </BrowserProvider>
  );
};

export default AppWithAutoBrowserProvider;
