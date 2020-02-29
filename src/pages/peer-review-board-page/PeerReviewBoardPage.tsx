import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import { Container } from '@material-ui/core';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import { groupBy } from 'ramda';
import { useFragment, useLazyLoadQuery } from 'react-relay/hooks';

import { PeerReviewBoardPageQuery } from './__generated__/PeerReviewBoardPageQuery.graphql';
import {
  PeerReviewBoardPage_user,
  PeerReviewBoardPage_user$key,
} from './__generated__/PeerReviewBoardPage_user.graphql';
import { PeerReviewBoards } from './PeerReviewBoards';
import { PeerReviewCompleted } from './PeerReviewCompleted';

const query = graphql`
  query PeerReviewBoardPageQuery {
    viewer {
      usersToReview {
        ...PeerReviewBoardPage_user
      }
    }
  }
`;

const fragment = graphql`
  fragment PeerReviewBoardPage_user on UserNode @relay(plural: true) {
    personReview {
      state
    }
    ...PeerReviewBoards_user
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

type UserType = ElementType<PeerReviewBoardPage_user>;

const groupByState = groupBy<UserType>((user: UserType) => {
  return user.personReview?.state || '';
});

export default function PeerReviewBoardPage(props: Props) {
  const data = useLazyLoadQuery<PeerReviewBoardPageQuery>(query, {});
  const usersToReview = useFragment<PeerReviewBoardPage_user$key>(fragment, data.viewer.usersToReview);
  const boards = groupByState(usersToReview);

  const [complete, setComplete] = useState(!(boards['TODO'] || boards['DOING']));

  const handleContinueEditingClick = useCallback(() => {
    setComplete(false);
  }, []);

  return (
    <Container>
      {complete ? <PeerReviewCompleted onClick={handleContinueEditingClick} /> : <PeerReviewBoards boards={boards} />}
    </Container>
  );
}
