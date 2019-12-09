import { i18n } from '@lingui/core';
import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CSSProperties } from '@material-ui/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function DashboardPage(props: Props) {
  const classes = useStyles(props);
  return <div className={classes.root}>{i18n._('Performance Review')}</div>;
}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'DashboardPage' });
type StyleProps = Styles<typeof styles>;
