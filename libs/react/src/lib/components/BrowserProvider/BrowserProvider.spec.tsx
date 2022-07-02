import React, { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import BrowserProvider from './BrowserProvider';
import { render } from '@testing-library/react';

jest.mock('react-helmet-async', () => ({
  HelmetProvider: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  BrowserRouter: jest.fn(),
}));

const mockedHelmetProvider = HelmetProvider as any as jest.Mock<JSX.Element>;
const mockedBrowserRouter = BrowserRouter as any as jest.Mock<
  ReturnType<typeof BrowserRouter>
>;

const renderBrowserProvider = () => {
  return render(
    <BrowserProvider>
      <p>test</p>
    </BrowserProvider>
  );
};

describe('BrowserProvider', () => {
  beforeAll(() => {
    mockedBrowserRouter.mockImplementation(
      ({ children }: PropsWithChildren) => (
        <div data-testid="BrowserRouter">{children}</div>
      )
    );
    mockedHelmetProvider.mockImplementation(
      ({ children }: PropsWithChildren) => (
        <div data-testid="HelmetProvider">{children}</div>
      )
    );
  });
  it('Wraps children in a nested `BrowserProvider` and `HelmetProvider`', () => {
    const { getByTestId, getByText } = renderBrowserProvider();

    const browserRouter = getByTestId('BrowserRouter');

    const helmetProvider = getByTestId('HelmetProvider');

    expect(helmetProvider).toEqual(browserRouter.firstChild);

    const children = getByText('test');

    expect(children).toEqual(helmetProvider.firstChild);
  });
});
