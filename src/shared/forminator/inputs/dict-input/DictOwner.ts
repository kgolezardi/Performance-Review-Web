import { assocPath, map, pipe, reduce, toPairs, values } from 'ramda';

import { BaseOwner } from '../../core/owner/BaseOwner';
import { DictState } from './dictReducer';
import { ForminatorFragment } from '../../core/fragment/ForminatorFragment';

export class DictOwner<Value> extends BaseOwner<DictState, Value> {
  async getFragments(fragmentValue: DictState): Promise<Array<ForminatorFragment<any>>> {
    return values(fragmentValue);
  }

  async calcValue(dictValue: DictState, fragmentsValues: Record<string, any>): Promise<Value> {
    return pipe<typeof dictValue, any, any, any>(
      toPairs,
      map(([key, f]) => [key.split('.'), fragmentsValues[f.id]]),
      reduce<any, any>((o, [path, v]) => assocPath(path, v, o), {}),
    )(dictValue);
  }
}
