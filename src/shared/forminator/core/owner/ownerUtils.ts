import { UndefinedOwnerError } from '../errors/UndefinedOwnerError';
import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { DefaultOwner } from './DefaultOwner';
import { FragmentOwner } from './FragmentOwner';

const defaultOwner = new DefaultOwner<any>();

export function getFragmentOwner<V, Value>(
  fragment: ForminatorFragment<V>,
  store: ForminatorStore,
): FragmentOwner<V, Value> {
  const owner = store.getOwnerSubscribable<V, Value>(fragment).getValue();
  if (owner === undefined) {
    throw new UndefinedOwnerError(fragment);
  }
  return owner || defaultOwner;
}
