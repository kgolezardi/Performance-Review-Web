import { i18n } from '@lingui/core';
import { Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { Done } from 'src/assets/icons/Done';
import { Todo } from 'src/assets/icons/Todo';
import { BoardList } from 'src/shared/board-list';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { InProgress } from 'src/assets/icons/InProgress';
import { EmptyList } from './EmptyList';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export default function PeerReviewBoardPage(props: Props) {
  const classes = useStyles(props);
  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <BoardList listTitle={i18n._('Todo')}>
          <EmptyList text={i18n._('Good job!')}>
            <Todo />
          </EmptyList>
        </BoardList>
        <BoardList listTitle={i18n._('In Progress')}>
          <EmptyList text={i18n._("You don't start to review yet!")}>
            <InProgress />
          </EmptyList>
        </BoardList>
        <BoardList listTitle={i18n._('Done')}>
          <EmptyList text={i18n._('Add every review that completed here')}>
            <Done />
          </EmptyList>
        </BoardList>
      </Grid>
    </Container>
  );
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PeerReviewBoardPage' });
type StyleProps = Styles<typeof styles>;
