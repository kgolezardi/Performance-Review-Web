import HelpIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import { Box, Grid, Theme, createStyles, lighten, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function SectionGuide(props: Props) {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <Box className={classes.root} displayPrint="none">
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <HelpIcon color="primary" fontSize="large" />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: lighten(theme.palette.primary.main, 0.85),
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(2),
      '@media print': {
        pageBreakInside: 'avoid',
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'SectionGuide' });
type StyleProps = Styles<typeof styles>;
