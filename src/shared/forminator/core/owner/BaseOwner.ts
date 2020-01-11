import { EmptyFragmentError } from '../errors/EmptyFragmentError';
import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { FragmentOwner } from './FragmentOwner';
import { getFragmentsFinalValues } from './getFragmentsFinalValues';
import { subscribeFragmentsFinalValues } from './subscribeFragmentsFinalValues';

export abstract class BaseOwner<V, Value> implements FragmentOwner<V, Value> {
  /**
   *
   * @param fragmentValue: value of fragment
   * @return list of fragments that final value depends on their values
   */
  abstract getFragments(fragmentValue: V): Array<ForminatorFragment<any>>;

  /**
   *
   * @param fragmentValue value of fragment
   * @param fragmentsValues map from fragment id to fragment value
   */
  abstract calcValue(fragmentValue: V, fragmentsValues: Record<string, any>): Value;

  getValue(fragment: ForminatorFragment<V>, store: ForminatorStore): Value {
    const fragmentValue = store.getValueSubscribable<V>(fragment).getValue();
    if (fragmentValue === undefined) {
      throw new EmptyFragmentError(fragment);
    }
    const fragmentsValues = getFragmentsFinalValues(this.getFragments(fragmentValue), store);
    return this.calcValue(fragmentValue, fragmentsValues);
  }

  subscribeValue(
    fragment: ForminatorFragment<V>,
    store: ForminatorStore,
    callback: (value: Value) => void,
  ): () => void {
    const fragmentSubscribable = store.getValueSubscribable<V>(fragment);

    let fragmentValue = fragmentSubscribable.getValue();
    let fragments: Array<ForminatorFragment<any>> = fragmentValue === undefined ? [] : this.getFragments(fragmentValue);
    let resubscribe = subscribeFragmentsFinalValues(fragments, store, newFragmentsValues => {
      const newFragmentValue = fragmentSubscribable.getValue();
      if (newFragmentValue === undefined) {
        return;
      }
      callback(this.calcValue(newFragmentValue, newFragmentsValues));
    });
    const unsubscribe = fragmentSubscribable.subscribe(newFragmentValue => {
      fragmentValue = newFragmentValue;
      let newFragments: Array<ForminatorFragment<any>> =
        fragmentValue === undefined ? [] : this.getFragments(fragmentValue);
      resubscribe(newFragments);
    });

    return () => {
      unsubscribe();
      resubscribe([]);
    };
  }
}
