import { act, renderHook } from '@testing-library/react-hooks';

import { useDialog } from './useDialog';

describe('useDialog', () => {
  it('should return false state when initial value is false', () => {
    const { result } = renderHook(() => {
      return useDialog(false);
    });

    expect(result.current.open).toBe(false);
  });

  it('should return true state when initial value is true', () => {
    const { result } = renderHook(() => {
      return useDialog(true);
    });

    expect(result.current.open).toBe(true);
  });

  describe('dialog', () => {
    it('should toggle state to false when onClose called', () => {
      const { result } = renderHook(() => {
        return useDialog(true);
      });

      act(() => {
        result.current.dialog.onClose();
      });

      expect(result.current.dialog.open).toBe(false);
      expect(result.current.open).toBe(false);
    });
  });

  describe('button', () => {
    it('should toggle state to true when onClick called', () => {
      const { result } = renderHook(() => {
        return useDialog(false);
      });

      act(() => {
        result.current.button.onClick();
      });

      expect(result.current.open).toBe(true);
      expect(result.current.dialog.open).toBe(true);
    });
  });
});
