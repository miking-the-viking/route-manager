import { useRoutes } from 'react-router-dom';
import { RouterProps } from '../../Router/Router';

const IndexRouter = <
  Key extends string,
  State extends Record<string, any>,
  ParamKeys extends string
>({
  routes,
}: Pick<RouterProps<Key, State, ParamKeys>, 'routes'>) => {
  const router = useRoutes(routes);
  return router;
};

export default IndexRouter;
