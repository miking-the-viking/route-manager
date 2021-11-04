import { WELCOME } from './Welcome.symbol';

export const WELCOME_ROUTE = {
  //   key: WELCOME,
  path: '/',
  importComponent: () => import('./Welcome'),
  //   name: 'Welcome',
  //   description: 'Main Welcome page for all visitors',
  //   icon: faHandMiddleFinger,
  //   collections: ['nav'],
};
