import { useRoutes } from 'react-router-dom';
import RouterProps from '../../types/RouterProps';

const IndexRouter = <Key extends string, State extends Record<string, any>>({
  routes,
}: Pick<RouterProps<Key, State>, 'routes'>) => {
  const router = useRoutes(routes);
  return router;
};

export default IndexRouter;
