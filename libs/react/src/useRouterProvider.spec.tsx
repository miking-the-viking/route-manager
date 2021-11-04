/* eslint-disable @typescript-eslint/no-explicit-any */
import useRouterProvider, { RouteType } from './useRouterProvider';
import { render } from '@testing-library/react';
import { useLocation } from 'react-router';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

// TODO: this concept may be easier to test using cypress in an implementing application

const App: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const Component = useRouterProvider(routes);
  return Component;
};

const SampleComponent: React.FC = () => {
  const { pathname } = useLocation();

  return <p data-testid="SampleComponent">{pathname}</p>;
};

const renderRouter = (routes: RouteType[]) => {
  return render(<App routes={routes} />);
};

describe('useRouterProvider', () => {
  describe('BrowserRouter', () => {
    it.todo('automatically wraps one');
    // error gets thrown if it does
    it.todo(
      'does not automatically wrap an additional BrowserRouter if there is already one'
    );
  });
  describe('HelmetProvider', () => {
    it.todo('Renders the HelmetProvider');
    it.todo(
      'does not automatically wrap an additional HelmetProvider if there is already one'
    );
  });
  describe('"useRoutes" router', () => {
    it.todo('is invoked with the expected routes');
    it.todo('renders inside the BrowserRouter');
  });
});
