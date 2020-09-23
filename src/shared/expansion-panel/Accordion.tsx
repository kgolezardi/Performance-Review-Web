import React from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Accordion as MuiAccordion, AccordionProps, Theme, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps extends AccordionProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function Accordion(props: Props) {
  const classes = useStyles(props);
  return <MuiAccordion defaultExpanded elevation={0} {...props} classes={classes} />;
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
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Accordion' });
type StyleProps = Styles<typeof styles>;
