import { makeStyles, Theme, Grid, Divider, Card, CardHeader, CardContent } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { Overlayscrollbars } from 'src/shared/overlayscrollbars';
import { FCProps } from 'src/shared/types/FCProps';
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

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(7),
    height: '70vh',
  } as CSSProperties,
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
  cardContentRoot: {
    padding: theme.spacing(3),
    position: 'relative',
    height: '100%',
  } as CSSProperties,
  cardHeaderRoot: {
    padding: theme.spacing(3, 2),
  } as CSSProperties,
  overlayscrollbars: {
    flex: 1,
    width: '100%',
  } as CSSProperties,
  childrenWrapper: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'BoardList' });
type StyleProps = Styles<typeof styles>;
