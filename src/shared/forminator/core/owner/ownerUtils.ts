import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { FragmentOwner } from './FragmentOwner';
import { UndefinedOwnerError } from '../errors/UndefinedOwnerError';

export async function getFragmentOwner<V, Value>(
  fragment: ForminatorFragment<V>,
  store: ForminatorStore,
): Promise<FragmentOwner<V, Value> | null> {
  const owner = store.getOwnerSubscribable<V, Value>(fragment).getValue();
  if (owner === undefined) {
    throw new UndefinedOwnerError(fragment);
  }
  return owner;
}
