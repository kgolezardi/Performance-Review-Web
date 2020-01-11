import { all, differenceWith, eqProps } from 'ramda';
import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { getFragmentFinalValue } from '../fragment/getFragmentFinalValue';
import { subscribeFragmentFinalValue } from '../fragment/subscribeFragmentFinalValue';
import { ForminatorStore } from '../store/ForminatorStore';

const isValidValues = (values: Record<string, any>, fragments: ForminatorFragment[]) => {
  return all(fragment => values[fragment.id] !== undefined, fragments);
};

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
  let values: Record<string, any> = {};

  const subscribeFragment = (fragment: ForminatorFragment) => {
    try {
      values[fragment.id] = getFragmentFinalValue(fragment, store);
    } catch (e) {}
    const unsubscribe = subscribeFragmentFinalValue(fragment, store, newValue => {
      values = { ...values, [fragment.id]: newValue };
      if (isValidValues(values, fragments)) {
        callback(values);
      }
    });
    unsubscribes.set(fragment.id, () => {
      unsubscribe();
      unsubscribes.delete(fragment.id);
      delete values[fragment.id];
    });
  };

  const unsubscribeFragment = (fragment: ForminatorFragment) => {
    unsubscribes.get(fragment.id)();
  };

  fragments.forEach(fragment => {
    subscribeFragment(fragment);
  });

  return (newFragments: ForminatorFragment[]) => {
    const fragmentsToUnsubscribe = differenceWith(eqProps('id'), fragments, newFragments);
    const fragmentsToSubscribe = differenceWith(eqProps('id'), newFragments, fragments);
    fragments = newFragments;
    fragmentsToUnsubscribe.forEach(fragment => {
      unsubscribeFragment(fragment);
    });
    fragmentsToSubscribe.forEach(fragment => {
      subscribeFragment(fragment);
    });
  };
}
