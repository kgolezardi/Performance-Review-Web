import { Box, Grid, lighten, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import HelpIcon from '@material-ui/icons/HelpOutline';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function SectionGuide(props: Props) {
  const { children } = props;
  const classes = useStyles(props);

  return (
    <Box className={classes.root}>
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
