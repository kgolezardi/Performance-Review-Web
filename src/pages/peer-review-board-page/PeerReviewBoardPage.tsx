import { i18n } from '@lingui/core';
import { Container, Grid, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import { groupBy } from 'ramda';
import React from 'react';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';
import { Done } from 'src/assets/icons/Done';
import { InProgress } from 'src/assets/icons/InProgress';
import { Todo } from 'src/assets/icons/Todo';
import { BoardList } from 'src/shared/board-list';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { UserCard } from 'src/shared/user-card';
import { EmptyList } from './EmptyList';
import { PeerReviewBoardPageQuery } from './__generated__/PeerReviewBoardPageQuery.graphql';
import {
  PeerReviewBoardPage_user,
  PeerReviewBoardPage_user$key,
} from './__generated__/PeerReviewBoardPage_user.graphql';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

const query = graphql`
  query PeerReviewBoardPageQuery {
    viewer {
      usersToReview {
        ...PeerReviewBoardPage_user
      }
    }
  }
`;

const userFragment = graphql`
  fragment PeerReviewBoardPage_user on UserNode @relay(plural: true) {
    id
    firstName
    lastName
    personReview {
      state
    }
    projectReviews {
      id
    }
  }
`;

type UserType = ElementType<PeerReviewBoardPage_user>;

const groupByState = groupBy<UserType>((user: UserType) => {
  return user.personReview?.state || '';
});

const generateCardList = (cardList: PeerReviewBoardPage_user) =>
  cardList.map((item: UserType) => (
    <UserCard
      userId={item.id}
      userFullName={`${item.firstName} ${item.lastName}`}
      description={i18n._('Requested for {count} project(s) to reivew.', { count: item.projectReviews.length })}
    />
  ));

export default function PeerReviewBoardPage(props: Props) {
  const classes = useStyles(props);
  const data = useLazyLoadQuery<PeerReviewBoardPageQuery>(query, {});
  const users = useFragment<PeerReviewBoardPage_user$key>(userFragment, data.viewer.usersToReview);
  const boards = groupByState(users);
  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <BoardList listTitle={i18n._('Todo')}>
          {boards['TODO'] ? (
            generateCardList(boards['TODO'])
          ) : (
            <EmptyList text={i18n._('Good job!')}>
              <Todo />
            </EmptyList>
          )}
        </BoardList>
        <BoardList listTitle={i18n._('In Progress')}>
          {boards['DOING'] ? (
            generateCardList(boards['DOING'])
          ) : (
            <EmptyList text={i18n._("You don't start to review yet!")}>
              <InProgress />
            </EmptyList>
          )}
        </BoardList>
        <BoardList listTitle={i18n._('Done')}>
          {boards['DONE'] ? (
            generateCardList(boards['DONE'])
          ) : (
            <EmptyList text={i18n._('Add every review that completed here')}>
              <Done />
            </EmptyList>
          )}
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
