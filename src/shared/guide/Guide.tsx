import * as React from 'react';
import { Button, Theme, createStyles, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';

import { GuideDialog } from './GuideDialog';
import { useDialog } from '../hooks';

interface OnwProps {
  buttonText?: React.ReactNode;
  guideText?: React.ReactNode;
  title?: React.ReactNode;
}

type Props = React.PropsWithChildren<OnwProps> & StyleProps;

export function Guide(props: Props) {
  const { buttonText = i18n._('Read the guide'), guideText, title } = props;
  const classes = useStyles(props);

  const {
    button: { onClick },
    dialog: { open, onClose },
  } = useDialog(false);

  return (
    <React.Fragment>
      <Button variant="text" color="primary" className={classes.button} onClick={onClick}>
        {buttonText}
      </Button>
      {guideText ? <GuideDialog open={open} onClose={onClose} guideText={guideText} title={title} /> : null}
    </React.Fragment>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      fontWeight: 'bold',
    },
  });
const useStyles = makeStyles(styles, { name: 'Guide' });
type StyleProps = Styles<typeof styles>;
