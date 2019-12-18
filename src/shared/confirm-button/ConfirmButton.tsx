import { i18n } from '@lingui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';
import React, { Fragment } from 'react';

interface OwnProps {
  buttonText: string;
  title?: React.ReactNode;
  text: React.ReactNode;
  onConfirm: () => void;
  ButtonComponent?: React.FunctionComponent<ButtonProps>;
  buttonProps?: ButtonProps;
  ConfirmComponent?: React.FunctionComponent<ButtonProps>;
  confirmProps?: ButtonProps;
  CancelComponent?: React.FunctionComponent<ButtonProps>;
  cancelProps?: ButtonProps;
}

export function ConfirmButton(props: OwnProps) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    buttonText,
    title,
    text,
    ButtonComponent = Button,
    buttonProps,
    CancelComponent = Button,
    cancelProps,
    ConfirmComponent = Button,
    confirmProps,
    onConfirm,
  } = props;

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

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
            {i18n._('No')}
          </CancelComponent>
          <ConfirmComponent {...confirmProps} onClick={handleConfirm}>
            {i18n._('Yes')}
          </ConfirmComponent>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
