import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { BoardList } from 'src/shared/board-list';
import { Done as DoneIcon } from 'src/assets/icons/Done';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid } from '@material-ui/core';
import { InProgress as InProgressIcon } from 'src/assets/icons/InProgress';
import { Todo as TodoIcon } from 'src/assets/icons/Todo';
import { UserCard } from 'src/shared/user-card';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { EmptyList } from './EmptyList';
import { PeerReviewBoards_user, PeerReviewBoards_user$key } from './__generated__/PeerReviewBoards_user.graphql';

const fragment = graphql`
  fragment PeerReviewBoards_user on UserNode @relay(plural: true) {
    id
    personReview {
      state
    }
    ...UserCard_user
  }
`;

interface OwnProps {
  boards: { [index: string]: PeerReviewBoards_user$key };
}

type Props = FCProps<OwnProps>;

type UserType = ElementType<PeerReviewBoards_user>;

const generateCardList = (cardList: PeerReviewBoards_user) =>
  cardList.map((user: UserType) => <UserCard user={user} key={user.id} />);

export function PeerReviewBoards(props: Props) {
  const todoBoard = useFragment(fragment, props.boards['TODO']);
  const doingBoard = useFragment(fragment, props.boards['DOING']);
  const doneBoard = useFragment(fragment, props.boards['DONE']);

  return (
    <Grid container spacing={2}>
      <BoardList listTitle={i18n._('Todo')}>
        {todoBoard ? generateCardList(todoBoard) : <EmptyList text={i18n._('Good job!')} icon={<TodoIcon />} />}
      </BoardList>
      <BoardList listTitle={i18n._('In Progress')}>
        {doingBoard ? (
          generateCardList(doingBoard)
        ) : (
          <EmptyList text={i18n._("You haven't started evaluating yet!")} icon={<InProgressIcon />} />
        )}
      </BoardList>
      <BoardList listTitle={i18n._('Done')}>
        {doneBoard ? (
          generateCardList(doneBoard)
        ) : (
          <EmptyList text={i18n._('Add here after completing any evaluation')} icon={<DoneIcon />} />
        )}
      </BoardList>
    </Grid>
  );
}
