import ImportComponentFunc from '../../types/ImportComponentFunc';
import UseTitle from '../../types/UseTitle';
import AbstractRoute from '../AbstractRoute/AbstractRoute';

/**
 * A StaticRoute is non-parameterized ensuring that the `path` will always be consistent, like `'welcome'` or `'*'`
 *
 * In this case it extends the AbstractRoute with the `path` being any `string`
 */
class StaticRoute<Key extends string> extends AbstractRoute<Key, string> {
  constructor(
    key: Key,
    path: string,
    importComponent: ImportComponentFunc,
    useTitle: UseTitle,
    children?: AbstractRoute<Key, string>[]
  ) {
    super(key, path, importComponent, useTitle, children);
  }

  static create<Key extends string, Path extends string>({
    key,
    path,
    importComponent,
    children,
    useTitle,
  }: {
    key: Key;
    path: string;
    importComponent: ImportComponentFunc;
    children?: AbstractRoute<Key, Path>[];
    useTitle: UseTitle;
  }) {
    return new StaticRoute<Key>(key, path, importComponent, useTitle, children);
  }

  static isStaticRoute<Key extends string>(
    route: any
  ): route is StaticRoute<Key> {
    return !!route && !route.params; // TODO: maybe make this more refined?
  }
}

export default StaticRoute;
