import { useReadonlySubscribableValue } from '../subscribable/useReadonlySubscribableValue';
import { FragmentLens } from './FragmentLens';
import { SubStore } from './types';

export function useLensValue<V>(lens: FragmentLens<V> | null = null): V | undefined {
  const subStore = useReadonlySubscribableValue<SubStore<V> | null>(lens && lens.getSubscribable());
  return useReadonlySubscribableValue<V>(subStore && subStore.store.getValueSubscribable<V>(subStore.fragment));
}
