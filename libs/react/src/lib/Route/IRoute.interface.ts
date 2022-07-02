import ConstructorTypeWithCreate from '../types/ConstructorTypeWithCreate';

interface IRoute<Key extends string, State extends Record<string, any>> {
  readonly element: JSX.Element;
  readonly key: Key;
  readonly useTitle: string | (() => string);
  readonly path: string;
  readonly children?: IRoute<Key, State>[];
  readonly rules?: Array<ConstructorTypeWithCreate<State>>;
}

export default IRoute;
