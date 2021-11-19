import React, { useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { storiesOf } from '@storybook/react';

import { useDialog } from './useDialog';

storiesOf('Dialog hook', module).add('Default', () => {
  const dialog = useDialog(false);
  const { toggle } = dialog;
  const onCancel = useCallback(() => {
    toggle(false);
  }, [toggle]);
  return (
    <div>
      <Button {...dialog.button} variant="contained" color="primary">
        open
      </Button>
      dialog is {dialog.open ? 'open' : 'close'}
      <Dialog {...dialog.dialog} fullWidth>
        <DialogContent>Test Dialog</DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
