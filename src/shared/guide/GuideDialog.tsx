import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends Omit<DialogProps, 'onClose' | 'title'> {
  guideText: React.ReactNode;
  onClose: () => void;
  title: React.ReactNode;
}

type Props = React.PropsWithChildren<OwnProps> & StyleProps;

export function GuideDialog(props: Props) {
  const { guideText, onClose, title, ...dialogProps } = props;

  const classes = useStyles(props);

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={handleClose} {...dialogProps}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {title}
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.content}>{guideText}</DialogContent>
    </Dialog>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    closeButton: {},
    content: {
      minHeight: 500,
    },
  });
const useStyles = makeStyles(styles, { name: 'GuideDialog' });
type StyleProps = Styles<typeof styles>;
