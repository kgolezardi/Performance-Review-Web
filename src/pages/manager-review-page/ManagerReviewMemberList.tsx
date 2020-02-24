import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { MembersList } from 'src/shared/members-list';
import { FCProps } from 'src/shared/types/FCProps';
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
