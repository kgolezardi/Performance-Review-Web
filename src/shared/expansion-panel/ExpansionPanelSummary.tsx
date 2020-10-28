import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import {
  ExpansionPanelSummary as MuiExpansionPanelSummary,
  ExpansionPanelSummaryProps,
  Theme,
  makeStyles,
} from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends ExpansionPanelSummaryProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function ExpansionPanelSummary(props: Props) {
  const classes = useStyles(props);
  return <MuiExpansionPanelSummary expandIcon={<ExpandMoreIcon />} {...props} classes={classes} />;
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
  expanded: {} as CSSProperties,
  focused: {} as CSSProperties,
  disabled: {} as CSSProperties,
  content: {
    '@media print': {
      flexWrap: 'wrap',
    },
  } as CSSProperties,
  expandIcon: {
    '@media print': {
      display: 'none !important',
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ExpansionPanelSummary' });
type StyleProps = Styles<typeof styles>;
