import { prop, zipObj } from 'ramda';
import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { getFragmentFinalValue } from '../fragment/getFragmentFinalValue';
import { ForminatorStore } from '../store/ForminatorStore';

export function getFragmentsFinalValues(fragments: ForminatorFragment[], store: ForminatorStore): Record<string, any> {
  const ids = fragments.map(prop('id'));
  const values = fragments.map(fragment => getFragmentFinalValue(fragment, store));
  return zipObj(ids, values);
}
