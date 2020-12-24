import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import {
  ExpansionPanelSummary as MuiExpansionPanelSummary,
  ExpansionPanelSummaryProps,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends ExpansionPanelSummaryProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function ExpansionPanelSummary(props: Props) {
  const classes = useStyles(props);
  return <MuiExpansionPanelSummary expandIcon={<ExpandMoreIcon />} {...props} classes={classes} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    expanded: {},
    focused: {},
    disabled: {},
    content: {
      '@media print': {
        flexWrap: 'wrap',
      },
    },
    expandIcon: {
      '@media print': {
        display: 'none !important',
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'ExpansionPanelSummary' });
type StyleProps = Styles<typeof styles>;
