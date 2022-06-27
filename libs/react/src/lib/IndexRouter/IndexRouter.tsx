import { useRoutes } from 'react-router-dom';
import RouterProps from '../types/RouterProps';

const IndexRouter = <State extends Record<string, any>>({
  routes,
}: RouterProps<State>) => {
  const router = useRoutes(routes);
  return router;
};

export default IndexRouter;
