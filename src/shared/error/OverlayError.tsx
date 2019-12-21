import { i18n } from '@lingui/core';
import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { amber as Amber } from '@material-ui/core/colors';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import WarningRounded from '@material-ui/icons/WarningRounded';
import React from 'react';
import { Overlay } from 'src/shared/overlay/Overlay';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  errorText?: string;
  retry?: (e: React.MouseEvent) => void;
  buttonText?: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function OverlayError(props: Props) {
  const classes = useStyles(props);
  const {
    retry,
    errorText = i18n._('Something went wrong. Please try again'),
    buttonText = i18n._('Try Again'),
  } = props;

  return (
    <Overlay>
      <WarningRounded style={{ fontSize: 100, color: Amber['400'] }} />
      <Typography variant="h3">{i18n._('Error')}</Typography>
      <Typography className={classes.label}>{errorText}</Typography>
      {!!retry && (
        <Button onClick={retry} variant="outlined" color="primary">
          {buttonText}
        </Button>
      )}
    </Overlay>
  );
}

const styles = (theme: Theme) => ({
  label: {
    textAlign: 'center',
    maxWidth: 240,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'OverlayError' });
type StyleProps = Styles<typeof styles>;
