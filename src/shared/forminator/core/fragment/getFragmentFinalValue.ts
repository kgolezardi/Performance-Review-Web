import { DefaultOwner } from '../owner/DefaultOwner';
import { getFragmentOwner } from '../owner/ownerUtils';
import { ForminatorStore } from '../store/ForminatorStore';
import { ForminatorFragment } from './ForminatorFragment';

const defaultOwner = new DefaultOwner<any>();

export async function getFragmentFinalValue<V, Value>(
  fragment: ForminatorFragment<V>,
  store: ForminatorStore,
): Promise<Value> {
  const owner = await getFragmentOwner<V, Value>(fragment, store);
  return await (owner || defaultOwner).getValue(fragment, store);
}
