import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { BoardList } from 'src/shared/board-list';
import { Container, Grid } from '@material-ui/core';
import { Done as DoneIcon } from 'src/assets/icons/Done';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import { GiftDialog } from 'src/shared/gift-dialog/GiftDialog';
import { InProgress as InProgressIcon } from 'src/assets/icons/InProgress';
import { Todo as TodoIcon } from 'src/assets/icons/Todo';
import { UserCard } from 'src/shared/user-card';
import { groupBy } from 'ramda';
import { i18n } from '@lingui/core';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';
import { useHistory, useLocation } from 'react-router-dom';

import { EmptyList } from './EmptyList';
import { PeerReviewBoardPageQuery } from './__generated__/PeerReviewBoardPageQuery.graphql';
import {
  PeerReviewBoardPage_user,
  PeerReviewBoardPage_user$key,
} from './__generated__/PeerReviewBoardPage_user.graphql';

interface OwnProps {}

type Props = FCProps<OwnProps>;

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
    personReview {
      state
    }
    ...UserCard_user
  }
`;

interface LocationState {
  showDialog?: boolean;
}

type UserType = ElementType<PeerReviewBoardPage_user>;

const groupByState = groupBy<UserType>((user: UserType) => {
  return user.personReview?.state || '';
});

const generateCardList = (cardList: PeerReviewBoardPage_user) =>
  cardList.map((user: UserType) => <UserCard user={user} key={user.id} />);

export default function PeerReviewBoardPage(props: Props) {
  const { state } = useLocation<LocationState>();
  const history = useHistory<LocationState>();
  const open = state?.showDialog ?? false;

  const data = useLazyLoadQuery<PeerReviewBoardPageQuery>(query, {});
  const users = useFragment<PeerReviewBoardPage_user$key>(userFragment, data.viewer.usersToReview);
  const boards = groupByState(users);

  const handleDialogClose = useCallback(() => {
    history.replace({ state: { showDialog: false } });
  }, [history]);

  const handleRecieveClick = useCallback(() => {
    handleDialogClose();
  }, [handleDialogClose]);

  const handleLaterClick = useCallback(() => {
    handleDialogClose();
  }, [handleDialogClose]);

  return (
    <Container>
      <GiftDialog open={open} onRecieveClick={handleRecieveClick} onLaterClick={handleLaterClick} />
      <Grid container spacing={2}>
        <BoardList listTitle={i18n._('Todo')}>
          {boards['TODO'] ? (
            generateCardList(boards['TODO'])
          ) : (
            <EmptyList text={i18n._('Good job!')} icon={<TodoIcon />} />
          )}
        </BoardList>
        <BoardList listTitle={i18n._('In Progress')}>
          {boards['DOING'] ? (
            generateCardList(boards['DOING'])
          ) : (
            <EmptyList text={i18n._("You haven't started evaluating yet!")} icon={<InProgressIcon />} />
          )}
        </BoardList>
        <BoardList listTitle={i18n._('Done')}>
          {boards['DONE'] ? (
            generateCardList(boards['DONE'])
          ) : (
            <EmptyList text={i18n._('Add here after completing any evaluation')} icon={<DoneIcon />} />
          )}
        </BoardList>
      </Grid>
    </Container>
  );
}
