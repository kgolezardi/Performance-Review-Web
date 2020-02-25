import React, { useContext, useDebugValue } from 'react';

import { ForminatorStore } from './ForminatorStore';

export const StoreContext = React.createContext<ForminatorStore | null>(null);

export function useStoreContext<T>(): ForminatorStore {
  const store = useContext(StoreContext);
  useDebugValue(store);
  if (store === null) throw new Error('useStoreContext only inside RootForm is usable');
  return store;
}
