import React, { Dispatch, useContext } from 'react';

import { DictAction } from './dictReducer';

export const DictContext = React.createContext<Dispatch<DictAction> | null>(null);

export function useDictContext<V = any>(): Dispatch<DictAction> {
  const fragment = useContext(DictContext);

  if (fragment === null) throw new Error('useDictContext only inside DictInput is usable');

  return fragment;
}
