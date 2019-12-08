import { useDebugValue } from 'react';
import { useFragmentContext } from '../fragment/FragmentContext';
import { useStoreContext } from '../store/StoreContext';
import { useReadonlySubscribableValue } from '../subscribable/useReadonlySubscribableValue';

export function useFragmentValue<V>(): V | undefined {
  const store = useStoreContext();
  const fragment = useFragmentContext<V>();
  const subscribable = store.getValueSubscribable(fragment);
  const value = useReadonlySubscribableValue(subscribable);
  useDebugValue(value);
  return value;
}
