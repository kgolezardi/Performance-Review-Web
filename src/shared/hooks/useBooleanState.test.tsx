import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { product } from 'src/shared/utils/product';

import { useBooleanState } from './useBooleanState';

describe('use boolean state', () => {
  describe('uncontrolled', () => {
    it.each([[true], [false]])('should initiate value to %j', (initialValue: boolean) => {
      const { result } = renderHook(() => {
        const [state] = useBooleanState({ initialValue });
        return { state };
      });
      expect(result.current.state).toBe(initialValue);
    });

    it.each([[true], [false]])('should toggle %j value', (initialValue: boolean) => {
      const { result } = renderHook(() => {
        const [state, toggle] = useBooleanState({ initialValue });
        return { state, toggle };
      });
      act(() => {
        result.current.toggle();
      });
      expect(result.current.state).toBe(!initialValue);
    });

    it.each(product([true, false], [true, false]))(
      'should toggle value from %j to %j',
      (initialValue: boolean, newValue: boolean) => {
        const { result } = renderHook(() => {
          const [state, toggle] = useBooleanState({ initialValue });
          return { state, toggle };
        });
        act(() => {
          result.current.toggle(newValue);
        });
        expect(result.current.state).toBe(newValue);
      },
    );
  });
  describe('controlled', () => {
    it('should return controlled state value only even call toggle', () => {
      const { result } = renderHook(() => {
        const [controlledState] = React.useState(true);
        const [state, toggle] = useBooleanState({
          value: controlledState,
        });

        return { state, toggle, controlledState };
      });

      expect(result.current.state).toBe(result.current.controlledState);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.state).toBe(result.current.controlledState);
    });

    it('should equal controlled state with state when we does not pass value', () => {
      const { result } = renderHook(() => {
        const [controlledState, setControlledState] = React.useState(true);
        const [state, toggle] = useBooleanState({
          onChange: setControlledState,
          initialValue: false,
        });

        return { state, toggle, controlledState };
      });

      expect(result.current.state).toBe(!result.current.controlledState);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.state).toBe(result.current.controlledState);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.state).toBe(result.current.controlledState);
    });
  });
});
