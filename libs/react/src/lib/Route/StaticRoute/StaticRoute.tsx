import ConstructorTypeWithCreate from '../../types/ConstructorTypeWithCreate';
import ImportComponentFunc from '../../types/ImportComponentFunc';
import UseTitle from '../../types/UseTitle';
import AbstractRoute from '../AbstractRoute/AbstractRoute';
import ParameterizedRoute from '../ParameterizedRoute/ParameterizedRoute';

export type StaticRouteProps<
  Key extends string,
  State extends Record<string, any>
  // ParamKeys extends string
> = {
  key: Key;
  path: string;
  importComponent: ImportComponentFunc;
  children?: (
    | StaticRoute<Key, State>
    | ParameterizedRoute<Key, string, State>
  )[];
  useTitle: UseTitle;
  rules?: Array<ConstructorTypeWithCreate<State>>;
};
/**
 * A StaticRoute is non-parameterized ensuring that the `path` will always be consistent, like `'welcome'` or `'*'`
 *
 * In this case it extends the AbstractRoute with the `path` being any `string`
 */
class StaticRoute<
  Key extends string,
  State extends Record<string, any>
> extends AbstractRoute<Key, string, State, StaticRoute<Key, State>> {
  constructor(
    key: Key,
    path: string,
    importComponent: ImportComponentFunc,
    useTitle: UseTitle,
    children?: AbstractRoute<Key, string, State, StaticRoute<Key, State>>[],
    rules?: Array<ConstructorTypeWithCreate<State>>
  ) {
    super(key, path, importComponent, useTitle, children, rules);
  }

  /**
   * Create a StaticRoute
   */
  static create<Key extends string, State extends Record<string, any>>({
    key,
    path,
    importComponent,
    children,
    useTitle,
    rules,
  }: StaticRouteProps<Key, State>) {
    return new StaticRoute<Key, State>(
      key,
      path,
      importComponent,
      useTitle,
      children,
      rules
    );
  }

  static isStaticRoute<Key extends string, State extends Record<string, any>>(
    route: any
  ): route is StaticRoute<Key, State> {
    return !!route && !route.params; // TODO: maybe make this more refined?
  }
}

export default StaticRoute;
