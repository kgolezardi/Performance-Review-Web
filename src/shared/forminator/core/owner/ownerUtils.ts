import { UndefinedOwnerError } from '../errors/UndefinedOwnerError';
import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { FragmentOwner } from './FragmentOwner';

export function getFragmentOwner<V, Value>(
  fragment: ForminatorFragment<V>,
  store: ForminatorStore,
): FragmentOwner<V, Value> | null {
  const owner = store.getOwnerSubscribable<V, Value>(fragment).getValue();
  if (owner === undefined) {
    throw new UndefinedOwnerError(fragment);
  }
  return owner;
}
