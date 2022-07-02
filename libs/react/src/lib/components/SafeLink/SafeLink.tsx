type SafeLinkProps<RouteKeys extends string> = {
  to: RouteKeys;
};

const SafeLink = <RouteKeys extends string>({
  to,
}: SafeLinkProps<RouteKeys>) => {
  return <p>Link to {to}</p>;
};

export default SafeLink;
