import { Dispatch, SetStateAction, useCallback } from 'react';

import { ForminatorStore } from './store/ForminatorStore';
import { FragmentOwner } from './owner/FragmentOwner';
import { Reducer, useForminatorReducer } from './useForminatorReducer';
import { useOwner } from './owner/useOwner';

function isSetStateAction<S>(action: SetStateAction<S>): action is (prevState: S) => S {
  return typeof action === 'function';
}

function isDefaultGetter<V>(value: V | (() => V)): value is () => V {
  return typeof value === 'function';
}

function reducer<V>(prevState: V, action: SetStateAction<V>, store: ForminatorStore): V {
  return isSetStateAction(action) ? action(prevState) : action;
}

function getDefaultValue<V>(defaultValue: V | (() => V)): V {
  return isDefaultGetter(defaultValue) ? defaultValue() : defaultValue;
}

export function useForminatorState<V, Value>(
  defaultValue: V | (() => V),
  owner: FragmentOwner<V, Value> | null,
): [V, Dispatch<SetStateAction<V>>];
export function useForminatorState<V, Value>(defaultValue: V | (() => V)): [V, Dispatch<SetStateAction<V>>];
export function useForminatorState<V>(): [V | null, Dispatch<SetStateAction<V | null>>];
export function useForminatorState<V, Value>(
  defaultValue: V | null | (() => V | null) = null,
  owner: FragmentOwner<V | null, Value> | null = null,
): [V | null, Dispatch<SetStateAction<V | null>>] {
  const [value, dispatch] = useForminatorReducer<Reducer<V, any>, any, any>(reducer, defaultValue, getDefaultValue);
  useOwner(owner);
  const setFragmentValue = useCallback((valueOrAction: SetStateAction<V | null>) => dispatch(valueOrAction), [
    dispatch,
  ]);

  return [value, setFragmentValue];
}
