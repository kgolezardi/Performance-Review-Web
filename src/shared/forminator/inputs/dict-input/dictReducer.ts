import { ForminatorFragment } from '../../core/fragment/ForminatorFragment';
import { ForminatorStore } from '../../core/store/ForminatorStore';

/*
set
unset
 */

export enum DictActionType {
  createKey = 'createKey',
  deleteKey = 'deleteKey',
}

export interface BaseDictAction {
  type: DictActionType;
}

export interface CreateKeyAction<V> extends BaseDictAction {
  type: DictActionType.createKey;
  key: string;
  initialValue: V;
}

export interface DeleteKeyAction extends BaseDictAction {
  type: DictActionType.deleteKey;
  key: string;
}

export type DictState<V = any> = Record<string, ForminatorFragment>;
export type DictAction<V = any> = CreateKeyAction<V> | DeleteKeyAction;

export function dictReducer<V>(state: DictState<V>, action: DictAction<V>, store: ForminatorStore): DictState<V> {
  switch (action.type) {
    case DictActionType.createKey: {
      if (state[action.key]) {
        return state;
      }

      return {
        ...state,
        [action.key]: store.createFragment<V>(action.initialValue),
      };
    }
    case DictActionType.deleteKey: {
      if (!state[action.key]) {
        return state;
      }

      const { [action.key]: fragment, ...rest } = state;
      // TODO remove fragment from store
      return rest;
    }
    default: {
      return state;
    }
  }
}

export function dictInitializer<V>(initialValue: V, store: ForminatorStore): DictState<V> {
  return {};
}
