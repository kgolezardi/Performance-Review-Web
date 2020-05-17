import React, { useContext, useDebugValue } from 'react';

import { ForminatorFragment } from './ForminatorFragment';

export const FragmentContext = React.createContext<ForminatorFragment | null>(null);

export function useFragmentContext<V = any>(): ForminatorFragment<V> {
  const fragment = useContext(FragmentContext);
  useDebugValue(fragment, (value) => (value ? `Fragment{id: ${value.id}}` : 'null'));

  if (fragment === null) throw new Error('useFragmentContext only inside RootForm is usable');

  return fragment;
}
