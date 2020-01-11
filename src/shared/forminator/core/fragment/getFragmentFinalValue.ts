import { UndefinedOwnerError } from '../errors/UndefinedOwnerError';
import { getFragmentOwner } from '../owner/ownerUtils';
import { ForminatorStore } from '../store/ForminatorStore';
import { ForminatorFragment } from './ForminatorFragment';

export function getFragmentFinalValue<V, Value>(fragment: ForminatorFragment<V>, store: ForminatorStore): Value {
  const owner = getFragmentOwner<V, Value>(fragment, store);
  if (owner === undefined) {
    throw new UndefinedOwnerError(fragment);
  }
  return owner.getValue(fragment, store);
}
