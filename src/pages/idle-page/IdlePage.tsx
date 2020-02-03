import { i18n } from '@lingui/core';
import { Card, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { useAppSettings } from 'src/core/settings';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function IdlePage(props: Props) {
  const classes = useStyles(props);
  const { idlePageUrl } = useAppSettings();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {!idlePageUrl ? (
          <Typography variant="h1">{i18n._('Programmers are typing...')}</Typography>
        ) : (
          <iframe src={idlePageUrl} title="title" width="640px" height="360px" className={classes.iframe} />
        )}
      </Card>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    height: '100%',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as CSSProperties,
  card: {
    padding: theme.spacing(5),
  } as CSSProperties,
  iframe: {
    borderWidth: 0,
    borderRadius: theme.spacing(0.5),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'IdlePage' });
type StyleProps = Styles<typeof styles>;
