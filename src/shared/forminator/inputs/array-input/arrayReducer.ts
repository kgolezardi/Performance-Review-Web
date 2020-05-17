import { ForminatorFragment } from '../../core/fragment/ForminatorFragment';
import { ForminatorStore } from '../../core/store/ForminatorStore';

/*
append
prepend
remove p
appendAfter p
move after p
map
reduce
 */

export enum ArrayActionType {
  append = 'append',
  prepend = 'prepend',
  remove = 'remove',
}

export interface BaseArrayAction {
  type: ArrayActionType;
}

// TODO add after variable
export interface AppendItemAction<V> extends BaseArrayAction {
  type: ArrayActionType.append;
  initialValue?: V | undefined;
}

// TODO add before variable
export interface PrependItemAction<V> extends BaseArrayAction {
  type: ArrayActionType.prepend;
  initialValue?: V | undefined;
}

export interface RemoveItemAction extends BaseArrayAction {
  type: ArrayActionType.remove;
  fragment: ForminatorFragment;
}

export type ArrayState<V> = ForminatorFragment<V>[];

export type ArrayAction<V = any> = AppendItemAction<V> | PrependItemAction<V> | RemoveItemAction;

export function arrayReducer<V>(state: ArrayState<V>, action: ArrayAction<V>, store: ForminatorStore): ArrayState<V> {
  switch (action.type) {
    case ArrayActionType.append: {
      return [...state, store.createFragment<V>(action.initialValue)];
    }
    case ArrayActionType.prepend: {
      return [store.createFragment<V>(action.initialValue), ...state];
    }
    case ArrayActionType.remove: {
      // TODO remove fragment from store
      return state.filter((fragment) => fragment.id !== action.fragment.id);
    }
    default: {
      return state;
    }
  }
}

export function arrayInitializer<V>(
  initialValue: (V | undefined)[] | undefined,
  store: ForminatorStore,
): ArrayState<V> {
  return initialValue === undefined ? [] : initialValue.map((value) => store.createFragment(value));
}
