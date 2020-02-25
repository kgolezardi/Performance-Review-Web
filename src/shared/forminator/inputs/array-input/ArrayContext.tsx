import React, { Dispatch, useContext } from 'react';

import { ArrayAction } from './arrayReducer';

export const ArrayContext = React.createContext<Dispatch<ArrayAction> | null>(null);

export function useArrayContext<V = any>(): Dispatch<ArrayAction> {
  const fragment = useContext(ArrayContext);

  if (fragment === null) throw new Error('useArrayContext only inside ArrayInput is usable');

  return fragment;
}
