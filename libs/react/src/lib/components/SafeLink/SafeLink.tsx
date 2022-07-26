import { PropsWithChildren } from 'react';

type SafeLinkProps<
  RouteKeys extends string,
  Props extends Record<string, any>
> = {
  to: RouteKeys;
  props?: Props;
};

type StaticSafeLinkProps<RouteKeys extends string> = { to: RouteKeys };
type ParameterizedSafeLinkProps<
  RouteKeys extends string,
  Params extends Record<string, any>
> = { to: RouteKeys } & Params;

const StaticSafeLink = <RouteKeys extends string>({
  to,
  children,
}: StaticSafeLinkProps<RouteKeys> & PropsWithChildren) => {
  console.log('SafeLinkProps to ', to);
  return <p>{children}</p>;
};

const ParameterizedSafeLink = <
  RouteKeys extends string,
  Params extends Record<string, any>
>({
  to,
  children,
  ...params
}: ParameterizedSafeLinkProps<RouteKeys, Params>) => {
  console.log('ParameterizedSafeLink', to, params);
  return <p>{children}</p>;
};

function SafeLink<RouteKeys extends string>({
  to,
  children,
}: StaticSafeLinkProps<RouteKeys> &
  PropsWithChildren): typeof StaticSafeLink<RouteKeys> & JSX.Element;

function SafeLink<
  RouteKeys extends string,
  Params extends Record<string, any>
>({
  to,
  children,
  ...params
}: ParameterizedSafeLinkProps<RouteKeys, Params> &
  PropsWithChildren): typeof ParameterizedSafeLink<RouteKeys, Params> &
  JSX.Element;

function SafeLink({ to, children, ...params }: any) {
  console.log('SafeLink', to, children, params);

  if (params && Object.keys(params).length > 0)
    return <ParameterizedSafeLink {...{ ...to, children, ...params }} />;
  return <StaticSafeLink {...{ to, children }} />;
}

export default SafeLink;
