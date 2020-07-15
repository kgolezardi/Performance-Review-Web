import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, makeStyles } from '@material-ui/core';

interface OwnProps {}

export type Props = FCProps<OwnProps> & StyleProps;

export function PageBreak(props: Props) {
  const classes = useStyles(props);

  return <div className={classes.root} />;
}
const styles = (theme: Theme) => ({
  root: {
    '@media print': {
      pageBreakAfter: 'always',
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ExpansionPanelSummary' });
type StyleProps = Styles<typeof styles>;
