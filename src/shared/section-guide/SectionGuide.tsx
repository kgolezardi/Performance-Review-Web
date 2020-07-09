import HelpIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import { Box, Grid, Theme, lighten, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
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

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: lighten(theme.palette.primary.main, 0.85),
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(2),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'SectionGuide' });
type StyleProps = Styles<typeof styles>;
