import DynamicParamPath from '../../types/DynamicParamPath';
import ImportComponentFunc from '../../types/ImportComponentFunc';
import UseTitle from '../../types/UseTitle';
import AbstractRoute from '../AbstractRoute/AbstractRoute';

/**
 * A ParameterizedRoute is requires parameters, leading to a dynamic path string literal, like `users/:id` or `:company/users/:id`
 *
 * It requires an additional generic to represent the keys of `params` in order to properly restrict the Path generic of the AbstractRoute
 *
 */
export class ParameterizedRoute<
  Key extends string,
  ParamKeys extends string
> extends AbstractRoute<Key, DynamicParamPath<ParamKeys>> {
  constructor(
    key: Key,
    public override readonly path: DynamicParamPath<ParamKeys>,
    public readonly params: Record<ParamKeys, string>,
    importComponent: ImportComponentFunc,
    useTitle: UseTitle,
    children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>>[]
  ) {
    super(key, path, importComponent, useTitle, children);
  }
  static create<Key extends string, ParamKeys extends string>({
    key,
    path,
    params,
    importComponent,
    useTitle,
    children,
  }: {
    key: Key;
    path: DynamicParamPath<ParamKeys>;
    params: Record<ParamKeys, string>;
    importComponent: ImportComponentFunc;
    useTitle: UseTitle;
    children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>>[];
  }) {
    return new ParameterizedRoute<Key, ParamKeys>(
      key,
      path,
      params,
      importComponent,
      useTitle,
      children
    );
  }

  static isParameterizedRoute<Key extends string, ParamKeys extends string>(
    route: any
  ): route is ParameterizedRoute<Key, ParamKeys> {
    return !!route && !route.params; // TODO: maybe make this more refined?
  }
}

export default ParameterizedRoute;
