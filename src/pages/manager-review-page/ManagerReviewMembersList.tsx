import graphql from 'babel-plugin-relay/macro';
import { map, prop, uniqBy } from 'ramda';
import React, { useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { MembersList } from 'src/shared/members-list';
import { ElementType } from 'src/shared/types/ElementType';
import { FCProps } from 'src/shared/types/FCProps';
import {
  ManagerReviewMembersList_personReviews,
  ManagerReviewMembersList_personReviews$key,
} from './__generated__/ManagerReviewMembersList_personReviews.graphql';
import {
  ManagerReviewMembersList_projectReviews,
  ManagerReviewMembersList_projectReviews$key,
} from './__generated__/ManagerReviewMembersList_projectReviews.graphql';

type UserType = ElementType<
  ManagerReviewMembersList_personReviews | ManagerReviewMembersList_projectReviews
>['reviewee'];
const getReviewee = map(prop('reviewee'));
const uniqueByUser = uniqBy<UserType, string>(prop('id'));

interface OwnProps {
  projectReviews: ManagerReviewMembersList_projectReviews$key;
  personReviews: ManagerReviewMembersList_personReviews$key;
  onClick: (id: string | null) => void;
}

type Props = FCProps<OwnProps>;

export function ManagerReviewMembersList(props: Props) {
  const { onClick } = props;
  const projectReviews = useFragment(fragmentProjectReviews, props.projectReviews);
  const personReviews = useFragment(fragmentPersonReviews, props.personReviews);

  const members = useMemo(() => uniqueByUser([...getReviewee(projectReviews), ...getReviewee(personReviews)]), [
    personReviews,
    projectReviews,
  ]);

  return <MembersList members={members} onClick={onClick} />;
}

const fragmentProjectReviews = graphql`
  fragment ManagerReviewMembersList_projectReviews on ProjectReviewNode @relay(plural: true) {
    reviewee {
      id
      ...MembersList_user
    }
  }
`;

const fragmentPersonReviews = graphql`
  fragment ManagerReviewMembersList_personReviews on PersonReviewNode @relay(plural: true) {
    reviewee {
      id
      ...MembersList_user
    }
  }
`;
