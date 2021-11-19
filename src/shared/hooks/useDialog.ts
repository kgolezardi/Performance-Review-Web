import { useCallback } from 'react';

import { useBooleanState } from './useBooleanState';

/**
 * Dialog hook return
 *
 * @exports
 * @interface DialogHooksReturnType
 */
export interface DialogHooksReturnType {
  open: boolean;
  toggle: (value?: boolean | undefined) => void;
  dialog: {
    open: boolean;
    onClose: () => void;
  };
  button: {
    onClick: () => void;
  };
}

/**
 * It control dialog state with its actions
 * @exports
 * @param {boolean} initialValue - Set initial state of "open state"
 * @returns {DialogHooksReturnType} open state and actions to control open state
 */
export function useDialog(initialValue: boolean): DialogHooksReturnType {
  const [open, toggle] = useBooleanState({ initialValue });

  const onClickButton = useCallback(() => {
    toggle(true);
  }, [toggle]);

  const onCloseDialog = useCallback(() => {
    toggle(false);
  }, [toggle]);

  return {
    open,
    toggle,
    dialog: { open, onClose: onCloseDialog },
    button: { onClick: onClickButton },
  };
}
