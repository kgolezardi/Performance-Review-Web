import { useEffect, useState } from 'react';
import { Subscribable } from './types';

export function useReadonlySubscribableValue<V>(
  subscribable: Subscribable<V> | null | undefined,
) {
  const [stateValue, setStateValue] = useState<V | undefined>(
    subscribable ? subscribable.getValue() : undefined,
  );
  useEffect(() => {
    if (subscribable) {
      setStateValue(subscribable.getValue());
      return subscribable.subscribe(value => {
        setStateValue(value);
      });
    }
  }, [subscribable]);
  return stateValue;
}
