import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

interface OwnProps {}

export type Props = FCProps<OwnProps> & StyleProps;

export function PageBreak(props: Props) {
  const classes = useStyles(props);

  return <div className={classes.root} />;
}
const styles = (theme: Theme) =>
  createStyles({
    root: {
      '@media print': {
        pageBreakAfter: 'always',
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'ExpansionPanelSummary' });
type StyleProps = Styles<typeof styles>;
