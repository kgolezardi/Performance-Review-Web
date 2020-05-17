import { differenceWith, eqProps } from 'ramda';

import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';

export type Fragments<V> = ReadonlyArray<Fragments<V>>;
/**
 *
 * @param fragments
 * @param store
 * @param callback
 *
 * @returns resubscribe function
 */
export function subscribeFragments<V>(
  fragments: ForminatorFragment[],
  store: ForminatorStore,
  callback: (values: Array<V | undefined>) => void,
): (fragments: ForminatorFragment[]) => void {
  const unsubscribes = new Map();
  let values: Record<string, any> = {};

  const subscribeFragment = (fragment: ForminatorFragment) => {
    const subscribable = store.getValueSubscribable(fragment);
    try {
      values[fragment.id] = subscribable.getValue();
    } catch (e) {}
    const unsubscribe = subscribable.subscribe((newValue) => {
      values = { ...values, [fragment.id]: newValue };
      callback(fragments.map((fragment) => values[fragment.id]));
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

  fragments.forEach((fragment) => {
    subscribeFragment(fragment);
  });

  return (newFragments: ForminatorFragment[]) => {
    const fragmentsToUnsubscribe = differenceWith(eqProps('id'), fragments, newFragments);
    const fragmentsToSubscribe = differenceWith(eqProps('id'), newFragments, fragments);
    fragments = newFragments;
    fragmentsToUnsubscribe.forEach((fragment) => {
      unsubscribeFragment(fragment);
    });
    fragmentsToSubscribe.forEach((fragment) => {
      subscribeFragment(fragment);
    });
  };
}

export function getFragmentsValues<V>(fragments: ForminatorFragment[], store: ForminatorStore): Array<V | undefined> {
  return fragments.map((fragment) => store.getValueSubscribable(fragment).getValue());
}
