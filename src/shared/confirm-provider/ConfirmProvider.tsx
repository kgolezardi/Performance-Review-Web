import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { ConfirmationDialog } from './ConfirmationDialog';

export interface ConfirmContextType {
  (message: string, callback: (result: boolean) => void): void;
}
export const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function useConfirmContext(): ConfirmContextType {
  const context = useContext(ConfirmContext);
  if (context === null) {
    throw new Error('useConfirmContext must be used inside the <ConfirmProvider/>');
  }
  return context;
}

interface OwnProps {}

type Props = FCProps<OwnProps>;

type ResultCallBack = (result: boolean) => void;

export function ConfirmProvider(props: Props) {
  const [open, setOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const callbackRef = useRef<undefined | ResultCallBack>();
  const getUserConfirmation = useCallback((message: string, callback: (result: boolean) => void) => {
    setDialogMessage(message);
    callbackRef.current = callback;
    setOpen(true);
  }, []);

  const resolve = useCallback((result: boolean) => {
    const callback = callbackRef.current;
    callbackRef.current = undefined;
    callback && callback(result);
  }, []);

  const onReject = useCallback(() => {
    resolve(false);
    setOpen(false);
  }, [resolve]);
  const onConfirm = useCallback(() => {
    resolve(true);
    setOpen(false);
  }, [resolve]);

  return (
    <ConfirmContext.Provider value={getUserConfirmation}>
      {props.children}
      <ConfirmationDialog
        open={open}
        fullWidth
        maxWidth="xs"
        onClose={onReject}
        text={dialogMessage}
        onConfirm={onConfirm}
        onReject={onReject}
      />
    </ConfirmContext.Provider>
  );
}
