import { makeStyles, Theme, Grid, Typography, Paper, Divider } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { ReactNode } from 'react';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { PlaceHolder } from './PlaceHolder';

export interface BoardListProps {
  listTitle: string;
  placeHolder?: ReactNode;
}
type Props = FCProps<BoardListProps> & StyleProps;

export const BoardList = (props: Props) => {
  const classes = useStyles(props);
  return (
    <Grid xs={4} className={classes.root} item container>
      <Grid xs={12} component={Paper} item container>
        <Grid xs={12} className={classes.head} item>
          <Typography variant="h5" className={classes.listTitle}>
            {props.listTitle}
          </Typography>
        </Grid>
        <Grid xs={12} className={classes.divider} item>
          <Divider />
        </Grid>
        <Grid xs={12} className={classes.innerBody} item container>
          <Overlayscrollbars className={classes.overlayscrollbars}>
            {(Array.isArray(props.children) && props.children.length !== 0) || !!props.children ? (
              <Grid xs className={classes.childrenWrapper} item container>
                {props.children}
              </Grid>
            ) : (
              <PlaceHolder>{props.placeHolder}</PlaceHolder>
            )}
          </Overlayscrollbars>
        </Grid>
      </Grid>
    </Grid>
  );
};

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(7),
    height: '70vh',
  } as CSSProperties,
  head: {
    padding: theme.spacing(3.4),
    height: theme.spacing(9),
  } as CSSProperties,
  listTitle: {
    color: '#616161',
  } as CSSProperties,
  divider: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  } as CSSProperties,
  innerBody: {
    overflowX: 'hidden',
    overflowY: 'auto',
    height: 'calc(100% - 72px)',
    position: 'relative',
    paddingBottom: theme.spacing(),
  } as CSSProperties,
  overlayscrollbars: {
    height: '100%',
    padding: theme.spacing(4),
    width: '100%',
  } as CSSProperties,
  childrenWrapper: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'BoardList' });
type StyleProps = Styles<typeof styles>;
