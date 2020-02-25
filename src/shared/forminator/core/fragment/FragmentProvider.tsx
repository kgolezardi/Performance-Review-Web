import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { ForminatorFragment } from './ForminatorFragment';
import { FragmentContext } from './FragmentContext';

interface OwnProps<V> {
  value: ForminatorFragment<V>;
}

type Props<T> = FCProps<OwnProps<T>>;

function FragmentProvider<V = any>(props: Props<V>) {
  return <FragmentContext.Provider value={props.value}>{props.children}</FragmentContext.Provider>;
}

export default FragmentProvider;
