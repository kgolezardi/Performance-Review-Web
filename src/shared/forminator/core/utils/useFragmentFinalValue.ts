import { useDebugValue } from 'react';
import { useFragmentContext } from '../fragment/FragmentContext';
import { useStoreContext } from '../store/StoreContext';
import { useReadonlySubscribableValue } from '../subscribable/useReadonlySubscribableValue';

export function useFragmentFinalValue<V, Value>(): Value | undefined {
  const store = useStoreContext();
  const fragment = useFragmentContext<V>();
  const owner = useReadonlySubscribableValue(store.getOwnerSubscribable<V, Value>(fragment));
  const subscribable = owner?.getSubscribable(fragment, store);
  const value = useReadonlySubscribableValue(subscribable);
  useDebugValue(value);
  return value;
}
