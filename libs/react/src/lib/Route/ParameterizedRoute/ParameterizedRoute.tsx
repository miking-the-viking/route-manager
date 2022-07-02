import ConstructorTypeWithCreate from '../../types/ConstructorTypeWithCreate';
import DynamicParamPath from '../../types/DynamicParamPath';
import ImportComponentFunc from '../../types/ImportComponentFunc';
import UseTitle from '../../types/UseTitle';
import AbstractRoute from '../AbstractRoute/AbstractRoute';

type ParameterizedRouteProps<
  Key extends string,
  ParamKeys extends string,
  State extends Record<string, any>
> = {
  key: Key;
  path: DynamicParamPath<ParamKeys>;
  params: Record<ParamKeys, string>;
  importComponent: ImportComponentFunc;
  useTitle: UseTitle;
  children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>, State>[];
  rules?: Array<ConstructorTypeWithCreate<State>>;
};

/**
 * A ParameterizedRoute is requires parameters, leading to a dynamic path string literal, like `users/:id` or `:company/users/:id`
 *
 * It requires an additional generic to represent the keys of `params` in order to properly restrict the Path generic of the AbstractRoute
 *
 */
export class ParameterizedRoute<
  Key extends string,
  ParamKeys extends string,
  State extends Record<string, any>
> extends AbstractRoute<Key, DynamicParamPath<ParamKeys>, State> {
  constructor(
    key: Key,
    public override readonly path: DynamicParamPath<ParamKeys>,
    public readonly params: Record<ParamKeys, string>,
    importComponent: ImportComponentFunc,
    useTitle: UseTitle,
    children?: AbstractRoute<Key, DynamicParamPath<ParamKeys>, State>[],
    rules?: Array<ConstructorTypeWithCreate<State>>
  ) {
    super(key, path, importComponent, useTitle, children, rules);
  }
  static create<
    Key extends string,
    ParamKeys extends string,
    State extends Record<string, any>
  >({
    key,
    path,
    params,
    importComponent,
    useTitle,
    children,
    rules,
  }: ParameterizedRouteProps<Key, ParamKeys, State>) {
    return new ParameterizedRoute<Key, ParamKeys, State>(
      key,
      path,
      params,
      importComponent,
      useTitle,
      children,
      rules
    );
  }

  static isParameterizedRoute<
    Key extends string,
    ParamKeys extends string,
    State extends Record<string, any>
  >(route: any): route is ParameterizedRoute<Key, ParamKeys, State> {
    return !!route && !route.params; // TODO: maybe make this more refined?
  }
}

export default ParameterizedRoute;
