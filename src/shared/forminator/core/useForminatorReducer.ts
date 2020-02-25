import { Dispatch, useCallback, useDebugValue } from 'react';

import { ForminatorStore } from './store/ForminatorStore';
import { useFragmentContext } from './fragment/FragmentContext';
import { useStoreContext } from './store/StoreContext';
import { useWritableSubscribableValue } from './subscribable/useWritableSubscribableValue';

export type Reducer<S, A> = (prevState: S, action: A, store: ForminatorStore) => S;
type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;

type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;

export function useForminatorReducer<R extends Reducer<any, any>, I, Value>(
  reducer: R,
  initializerArg: I,
  initializer: (arg: I, store: ForminatorStore) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  type V = ReducerState<R>;
  const store = useStoreContext();
  const fragment = useFragmentContext<V>();

  const subscribable = store.getValueSubscribable(fragment);
  const [value, setValue] = useWritableSubscribableValue(
    subscribable,
    (): V => {
      const initialValue = store.getInitialValue<I>(fragment, initializerArg);
      return initializer(initialValue, store);
    },
  );
  useDebugValue(value);

  const dispatch = useCallback(
    (action: ReducerAction<R>) => {
      setValue(
        reducer(subscribable.getValue(value), action, store), // initial value
      );
    },
    // `value` variable only used as default value
    // `reducer` should be pure (only use arguments)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, subscribable],
  );

  return [value, dispatch];
}
