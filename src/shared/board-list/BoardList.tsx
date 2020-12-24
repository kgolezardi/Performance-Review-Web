import React from 'react';
import { Card, CardContent, CardHeader, Divider, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { Styles } from 'src/shared/types/Styles';

export interface BoardListProps {
  listTitle: string;
}
type Props = FCProps<BoardListProps> & StyleProps;

export const BoardList = (props: Props) => {
  const classes = useStyles(props);
  return (
    <Grid xs={4} className={classes.root} item>
      <Card className={classes.card}>
        <CardHeader classes={{ root: classes.cardHeaderRoot }} title={props.listTitle} />
        <Divider variant="middle" />
        <Overlayscrollbars className={classes.overlayscrollbars}>
          <CardContent classes={{ root: classes.cardContentRoot }}>{props.children}</CardContent>
        </Overlayscrollbars>
      </Card>
    </Grid>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(7),
      height: '75vh',
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContentRoot: {
      padding: theme.spacing(3),
      position: 'relative',
      height: '100%',
    },
    cardHeaderRoot: {
      padding: theme.spacing(3, 2),
      color: theme.palette.grey[700],
    },
    overlayscrollbars: {
      flex: 1,
      width: '100%',
    },
    childrenWrapper: {},
  });

const useStyles = makeStyles(styles, { name: 'BoardList' });
type StyleProps = Styles<typeof styles>;
