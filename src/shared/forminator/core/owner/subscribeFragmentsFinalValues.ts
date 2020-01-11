import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { getFragmentFinalValue } from '../fragment/getFragmentFinalValue';
import { subscribeFragmentFinalValue } from '../fragment/subscribeFragmentFinalValue';
import { ForminatorStore } from '../store/ForminatorStore';

/**
 *
 * @param fragments
 * @param store
 * @param callback
 *
 * @returns resubscribe function
 */
export function subscribeFragmentsFinalValues(
  fragments: ForminatorFragment[],
  store: ForminatorStore,
  callback: (values: Record<string, any>) => void,
): (fragments: ForminatorFragment[]) => void {
  const unsubscribes = new Map();
  let valuesMap: Record<string, any> = {};
  fragments.forEach(fragment => {
    valuesMap[fragment.id] = getFragmentFinalValue(fragment, store);
    unsubscribes.set(
      fragment.id,
      subscribeFragmentFinalValue(fragment, store, newValue => {
        valuesMap = { ...valuesMap, [fragment.id]: newValue };
        callback(valuesMap);
      }),
    );
  });
  return (fragments: ForminatorFragment[]) => {};
}
