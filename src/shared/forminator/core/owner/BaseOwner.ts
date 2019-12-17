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
  abstract async getFragments(fragmentValue: V): Promise<Array<ForminatorFragment<any>>>;

  /**
   *
   * @param fragmentValue value of fragment
   * @param fragmentsValues map from fragment id to fragment value
   */
  abstract async calcValue(fragmentValue: V, fragmentsValues: Record<string, any>): Promise<Value>;

  async getValue(fragment: ForminatorFragment<V>, store: ForminatorStore): Promise<Value> {
    const fragmentValue = store.getValueSubscribable<V>(fragment).getValue();
    if (fragmentValue === undefined) {
      throw new EmptyFragmentError(fragment);
    }
    const fragmentsValues = await getFragmentsFinalValues(await this.getFragments(fragmentValue), store);
    return await this.calcValue(fragmentValue, fragmentsValues);
  }
}
