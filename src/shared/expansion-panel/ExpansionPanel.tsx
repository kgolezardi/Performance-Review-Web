import { ExpansionPanel as MuiExpansionPanel, ExpansionPanelProps, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends ExpansionPanelProps {}

type Props = FCProps<OwnProps>;

export function ExpansionPanel(props: Props) {
  const classes = useStyles(props);
  return <MuiExpansionPanel defaultExpanded elevation={0} {...props} classes={classes} />;
}

const styles = (theme: Theme) => ({
  root: {
    '&:first-child:before': {
      display: 'none',
    },
    '&:not(:first-child):before': {
      display: 'block !important',
      opacity: '100% !important',
    },
    '&$expansionPanelExpanded': {
      margin: 0,
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ExpansionPanel' });
type StyleProps = Styles<typeof styles>;
