import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

/**
 * Sets up required `BrowserRouter` as well as a `HelmetProvider` for dynamically updating the page title on the fly
 *
 * **Ensure that the main component is wrapped by this function**
 */
const BrowserProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <HelmetProvider>{children}</HelmetProvider>
  </BrowserRouter>
);

export default BrowserProvider;
