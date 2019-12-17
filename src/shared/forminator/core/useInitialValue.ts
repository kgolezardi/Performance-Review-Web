import { useFragmentContext } from './fragment/FragmentContext';
import { useStoreContext } from './store/StoreContext';

export function useInitialValue<V>(defaultValue: V): V;
export function useInitialValue<V>(defaultValue?: V | undefined): V | undefined;
export function useInitialValue<V>(defaultValue?: V | undefined): V | undefined {
  const store = useStoreContext();
  const fragment = useFragmentContext<V>();

  return store.getInitialValue(fragment, defaultValue);
}
