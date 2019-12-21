import { i18n } from '@lingui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React, { Fragment, useCallback } from 'react';

interface OwnProps {
  buttonText: string;
  title?: React.ReactNode;
  text: React.ReactNode;
  onConfirm: () => void;
  ButtonComponent?: React.FunctionComponent<ButtonProps>;
  buttonProps?: ButtonProps;
  ConfirmComponent?: React.FunctionComponent<ButtonProps>;
  confirmProps?: ButtonProps;
  confirmButtonText?: string;
  CancelComponent?: React.FunctionComponent<ButtonProps>;
  cancelProps?: ButtonProps;
  cancelButtonText?: string;
}

export function ConfirmButton(props: OwnProps) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const {
    buttonText,
    title,
    text,
    ButtonComponent = Button,
    buttonProps,
    CancelComponent = Button,
    cancelProps,
    cancelButtonText = i18n._('No'),
    ConfirmComponent = Button,
    confirmProps,
    confirmButtonText = i18n._('Yes'),
    onConfirm,
  } = props;

  const handleConfirm = useCallback(() => {
    onConfirm();
    handleClose();
  }, [onConfirm, handleClose]);

  return (
    <Fragment>
      <ButtonComponent {...buttonProps} onClick={handleClickOpen}>
        {buttonText}
      </ButtonComponent>

      <Dialog open={open} onClose={handleClose}>
        {!!title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelComponent {...cancelProps} onClick={handleClose}>
            {cancelButtonText}
          </CancelComponent>
          <ConfirmComponent {...confirmProps} onClick={handleConfirm}>
            {confirmButtonText}
          </ConfirmComponent>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
