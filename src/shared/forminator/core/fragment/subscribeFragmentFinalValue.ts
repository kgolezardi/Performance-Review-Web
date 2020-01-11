import { getFragmentOwner } from '../owner/ownerUtils';
import { ForminatorStore } from '../store/ForminatorStore';
import { ForminatorFragment } from './ForminatorFragment';
import { getFragmentFinalValue } from './getFragmentFinalValue';

export function subscribeFragmentFinalValue<V, Value>(
  fragment: ForminatorFragment<V>,
  store: ForminatorStore,
  callback: (value: Value) => void,
): () => void {
  let owner = getFragmentOwner<V, Value>(fragment, store);
  let unsubscribeValue = () => {};
  if (owner) {
    unsubscribeValue = owner.subscribeValue(fragment, store, callback);
  }
  const unsubscribeOwner = store.getOwnerSubscribable<V, Value>(fragment).subscribe(newOwner => {
    owner = getFragmentOwner<V, Value>(fragment, store);
    unsubscribeValue();
    unsubscribeValue = () => {};

    if (owner) {
      callback(getFragmentFinalValue(fragment, store));
      unsubscribeValue = owner.subscribeValue(fragment, store, callback);
    }
  });
  return () => {
    unsubscribeOwner();
    unsubscribeValue();
  };
}
