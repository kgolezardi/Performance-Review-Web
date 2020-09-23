import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { AccordionSummary as MuiAccordionSummary, AccordionSummaryProps, Theme, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends AccordionSummaryProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function AccordionSummary(props: Props) {
  const classes = useStyles(props);
  return <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} {...props} classes={classes} />;
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
      display: 'none',
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'AccordionSummary' });
type StyleProps = Styles<typeof styles>;
