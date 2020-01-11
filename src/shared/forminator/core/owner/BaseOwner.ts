import { EmptyFragmentError } from '../errors/EmptyFragmentError';
import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { ReadOnlySubscribable } from '../subscribable/types';
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

    let fragmentValue: V | undefined = fragmentSubscribable.getValue();
    let fragmentsValues: Record<string, any> | undefined = undefined;
    if (fragmentValue !== undefined) {
      try {
        fragmentsValues = getFragmentsFinalValues(this.getFragments(fragmentValue), store);
      } catch (e) {}
    }
    let fragments: Array<ForminatorFragment<any>> = fragmentValue === undefined ? [] : this.getFragments(fragmentValue);
    let resubscribe = subscribeFragmentsFinalValues(fragments, store, newFragmentsValues => {
      fragmentsValues = newFragmentsValues;
      if (fragmentValue === undefined) {
        return;
      }
      callback(this.calcValue(fragmentValue, newFragmentsValues));
    });
    const unsubscribe = fragmentSubscribable.subscribe(newFragmentValue => {
      fragmentValue = newFragmentValue;
      let newFragments: Array<ForminatorFragment<any>> =
        fragmentValue === undefined ? [] : this.getFragments(fragmentValue);
      if (fragmentsValues !== undefined) {
        callback(this.calcValue(newFragmentValue, fragmentsValues));
      }
      resubscribe(newFragments);
    });

    return () => {
      unsubscribe();
      resubscribe([]);
    };
  }

  private _subscribable: ReadOnlySubscribable<Value> | undefined = undefined;

  getSubscribable<V>(fragment: ForminatorFragment<V>, store: ForminatorStore): ReadOnlySubscribable<Value> {
    const owner = this;
    if (this._subscribable) {
      return this._subscribable;
    }
    const subscribable: ReadOnlySubscribable<Value> = {
      getValue(defaultValue?: Value): any {
        let value;
        try {
          value = owner.getValue(fragment, store);
        } catch (e) {}
        return value === undefined ? defaultValue : value;
      },
      subscribe(callback: (value: Value) => void): () => void {
        return owner.subscribeValue(fragment, store, callback);
      },
    };
    this._subscribable = subscribable;
    return subscribable;
  }
}
