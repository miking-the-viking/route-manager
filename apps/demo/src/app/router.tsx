import { Router } from '@route-manager/react';
import ROUTES from './routes';

// This is a good single point of entry/export for a type-safe router
const ROUTER = Router.generate({ routes: ROUTES });

export default ROUTER;
