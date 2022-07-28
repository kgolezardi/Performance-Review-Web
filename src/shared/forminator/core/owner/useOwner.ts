import { useEffect } from 'react';
import { useFragmentContext } from '../fragment/FragmentContext';
import { useStoreContext } from '../store/StoreContext';
import { FragmentOwner } from './FragmentOwner';

export function useOwner<V, Value>(owner: FragmentOwner<V, Value> | null) {
  const store = useStoreContext();
  const fragment = useFragmentContext<V>();
  useEffect(() => {
    store.getOwnerSubscribable<V, Value>(fragment).setValue(owner);
  }, [store, fragment, owner]);
}
