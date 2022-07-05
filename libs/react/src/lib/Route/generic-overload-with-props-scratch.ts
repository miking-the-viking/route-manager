import { Key } from 'react';

class HasProps<Key extends string, Props extends Record<string, any>> {
  constructor(public readonly key: Key, public readonly props?: Props) {}

  static create<Key extends string>({
    key,
  }: {
    key: Key;
  }): HasProps<Key, Record<string, any>>;
  static create<Key extends string, Props extends Record<string, any>>({
    key,
    props,
  }: {
    key: Key;
    props?: Props;
  }): HasProps<Key, Props>;
  static create<Key extends string, Props extends Record<string, any>>({
    key,
    props,
  }: {
    key: Key;
    props?: Props;
  }) {
    return new HasProps(key, props);
  }
}

const hp1 = HasProps.create({
  key: 'test',
});

const hp2 = HasProps.create({
  key: 'test2',
  props: {
    prop2: 'sweet',
  },
});

const routes = [hp1, hp2];
