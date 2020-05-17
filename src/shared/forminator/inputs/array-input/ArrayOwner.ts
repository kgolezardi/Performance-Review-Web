import { ArrayState } from './arrayReducer';
import { BaseOwner } from '../../core/owner/BaseOwner';
import { ForminatorFragment } from '../../core/fragment/ForminatorFragment';

export class ArrayOwner<V> extends BaseOwner<ArrayState<V>, V[]> {
  async getFragments(fragmentValue: ArrayState<V>): Promise<Array<ForminatorFragment<V>>> {
    return fragmentValue;
  }

  async calcValue(fragmentValue: ForminatorFragment<V>[], fragmentsValues: Record<string, V>): Promise<V[]> {
    return fragmentValue.map((fragment) => fragmentsValues[fragment.id]);
  }
}
