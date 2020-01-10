import { ForminatorFragment } from '../fragment/ForminatorFragment';
import { BaseOwner } from './BaseOwner';

export class DefaultOwner<V> extends BaseOwner<V, V> {
  calcValue(fragmentValue: V, fragmentsValues: Record<string, any>): V {
    return fragmentValue;
  }

  getFragments(fragmentValue: V): Array<ForminatorFragment<any>> {
    return [];
  }
}
