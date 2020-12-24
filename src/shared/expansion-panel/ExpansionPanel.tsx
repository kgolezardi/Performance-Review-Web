import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import {
  ExpansionPanel as MuiExpansionPanel,
  ExpansionPanelProps,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends ExpansionPanelProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function ExpansionPanel(props: Props) {
  const classes = useStyles(props);
  return <MuiExpansionPanel defaultExpanded elevation={0} {...props} classes={classes} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '&:first-child:before': {
        display: 'none',
      },
      '&:not(:first-child):before': {
        display: 'block !important',
        opacity: '100% !important',
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'ExpansionPanel' });
type StyleProps = Styles<typeof styles>;
