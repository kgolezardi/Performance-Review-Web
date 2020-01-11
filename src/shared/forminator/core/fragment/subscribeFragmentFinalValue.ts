import { getFragmentOwner } from '../owner/ownerUtils';
import { ForminatorStore } from '../store/ForminatorStore';
import { ForminatorFragment } from './ForminatorFragment';

export function subscribeFragmentFinalValue<V, Value>(
  fragment: ForminatorFragment<V>,
  store: ForminatorStore,
  callback: (value: Value) => void,
): () => void {
  const owner = getFragmentOwner<V, Value>(fragment, store);
  return owner.subscribeValue(fragment, store, callback);
}
