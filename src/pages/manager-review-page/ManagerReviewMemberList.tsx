import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { MembersList } from 'src/shared/members-list';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewMemberListQuery } from './__generated__/ManagerReviewMemberListQuery.graphql';

const query = graphql`
  query ManagerReviewMemberListQuery {
    viewer {
      usersToReview {
        ...MembersList_user
      }
    }
  }
`;

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function ManagerReviewMemberList(props: Props) {
  const data = useLazyLoadQuery<ManagerReviewMemberListQuery>(query, {});
  return <MembersList members={data.viewer.usersToReview} />;
}
