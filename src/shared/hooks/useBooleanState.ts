import * as React from 'react';
import { useControlledState } from '@react-stately/utils';

// TODO: remove this declaration when @react-stately/utils merged pr
declare module '@react-stately/utils' {
  export function useControlledState<T>(
    value?: T,
    defaultValue?: T,
    onChange?: (value: T, ...args: any[]) => void,
  ): [T, (value: T | ((prevState: T) => T), ...args: any[]) => void];
}

export interface UseBooleanStateParams {
  initialValue?: boolean;
  value?: boolean;
  onChange?: (state: boolean, ...args: unknown[]) => void;
}
/**
 * keep boolean state
 * @param UseBooleanStateParams
 * @return:
 *  0: current state
 *  1: toggle function
 *    toggle(false) set current value to false
 *    toggle(true)  set current value to true
 *    toggle()      toggle value
 */
export const useBooleanState = (params: UseBooleanStateParams = {}): [boolean, (value?: boolean) => void] => {
  const { initialValue = false, onChange, value } = params;
  const [state, setState] = useControlledState(value, initialValue, onChange);

  const toggleValue = React.useCallback(
    (value: boolean | undefined) => {
      if (value === undefined) {
        setState((s) => !s);
      } else {
        setState(value);
      }
    },
    [setState],
  );

  return [state, toggleValue];
};
