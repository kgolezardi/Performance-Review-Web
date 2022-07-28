import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { BaseOwner } from './BaseOwner';

export class DefaultOwner<V> extends BaseOwner<V, V> {
  async calcValue(fragmentValue: V, fragmentsValues: Record<string, any>): Promise<V> {
    return fragmentValue;
  }

  async getFragments(fragmentValue: V): Promise<Array<ForminatorFragment<any>>> {
    return [];
  }
}
