import Mitt from 'mitt';
import { EmptyFragmentError } from '../errors/EmptyFragmentError';
import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { ForminatorStore } from '../store/ForminatorStore';
import { FragmentOwner } from './FragmentOwner';
import { getFragmentsFinalValues } from './getFragmentsFinalValues';

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
    const emitter = Mitt();

    const handler = (value: Value) => {
      callback(value);
    };
    emitter.on('value', handler);

    // const fragmentSubscribable = store.getValueSubscribable<V>(fragment);
    // const fragmentValue = fragmentSubscribable.getValue();
    // const fragments = this.getFragments(fragmentValue);
    //
    // console.log(fragments);
    //
    // fragmentSubscribable.subscribe(newFragmentValue => {});

    return () => {
      emitter.off('value', handler);
    };
  }
}
