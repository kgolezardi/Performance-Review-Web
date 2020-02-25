import { useEffect } from 'react';

import { FragmentOwner } from './FragmentOwner';
import { useFragmentContext } from '../fragment/FragmentContext';
import { useStoreContext } from '../store/StoreContext';

export function useOwner<V, Value>(owner: FragmentOwner<V, Value> | null) {
  const store = useStoreContext();
  const fragment = useFragmentContext<V>();
  useEffect(() => {
    store.getOwnerSubscribable<V, Value>(fragment).setValue(owner);
  }, [store, fragment, owner]);
}
