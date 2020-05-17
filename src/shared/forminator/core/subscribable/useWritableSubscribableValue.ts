import { Dispatch, useCallback, useDebugValue, useEffect, useState } from 'react';

import { Subscribable } from './types';

export function useWritableSubscribableValue<V>(
  subscribable: Subscribable<V>,
  initialValue: V | (() => V),
): [V, Dispatch<V>] {
  const [stateValue, setStateValue] = useState<V>(initialValue);
  useDebugValue(stateValue);
  useEffect(() => {
    const subscribableValue = subscribable.getValue();
    if (subscribableValue !== undefined && subscribableValue !== stateValue) {
      setStateValue(subscribableValue);
    } else {
      subscribable.setValue(stateValue);
    }
    return subscribable.subscribe((value) => {
      setStateValue(value);
    });
    // `stateValue` variable only used as initial value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribable]);

  const setValue = useCallback(
    (value: V) => {
      subscribable.setValue(value);
    },
    [subscribable],
  );

  return [stateValue, setValue];
}
