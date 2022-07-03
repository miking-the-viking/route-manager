import { PropsWithChildren } from 'react';

type SafeLinkProps<RouteKeys extends string> = {
  to: RouteKeys;
};

const SafeLink = <RouteKeys extends string>({
  to,
  children,
}: SafeLinkProps<RouteKeys> & PropsWithChildren) => {
  console.log('Rendering route link to ', to);
  return <p>{children}</p>;
};

export default SafeLink;
