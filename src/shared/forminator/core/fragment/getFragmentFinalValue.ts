import { DefaultOwner } from '../owner/DefaultOwner';
import { ForminatorFragment } from './ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { getFragmentOwner } from '../owner/ownerUtils';

const defaultOwner = new DefaultOwner<any>();

export async function getFragmentFinalValue<V, Value>(
  fragment: ForminatorFragment<V>,
  store: ForminatorStore,
): Promise<Value> {
  const owner = await getFragmentOwner<V, Value>(fragment, store);
  return await (owner || defaultOwner).getValue(fragment, store);
}
