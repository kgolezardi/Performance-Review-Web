import { i18n } from '@lingui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog/Dialog';
import React from 'react';
import { DangerButton } from 'src/shared/danger-button';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  text: string;
  onConfirm: () => void;
  onReject: () => void;
}

type Props = FCProps<OwnProps> & DialogProps;

export function ConfirmationDialog(props: Props) {
  const { text, onConfirm, onReject, ...rest } = props;
  return (
    <Dialog {...rest}>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject}>{i18n._('No! Wait')}</Button>
        <DangerButton variant="contained" onClick={onConfirm}>
          {i18n._('Yes! Go')}
        </DangerButton>
      </DialogActions>
    </Dialog>
  );
}
