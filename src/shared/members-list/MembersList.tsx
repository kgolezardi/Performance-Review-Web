import React, { useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'react-relay/hooks';
import {
  MembersList_projectReviews,
  MembersList_projectReviews$key,
} from './__generated__/MembersList_projectReviews.graphql';
import {
  MembersList_personReviews,
  MembersList_personReviews$key,
} from './__generated__/MembersList_personReviews.graphql';
import { MembersListItem } from './MembersListItem';
import { map, prop, uniqBy } from 'ramda';
import { ElementType } from 'src/shared/types/ElementType';
import { List } from '@material-ui/core';

interface OwnProps {
  projectReviews: MembersList_projectReviews$key;
  personReviews: MembersList_personReviews$key;
}

type UserType = ElementType<MembersList_personReviews | MembersList_projectReviews>['reviewee'];
type Props = FCProps<OwnProps>;
const getReviewee = map(prop('reviewee'));
const uniqueByUser = uniqBy<UserType, string>(prop('id'));

export function MembersList(props: Props) {
  const projectReviews = useFragment(fragmentProjectReviews, props.projectReviews);
  const personReviews = useFragment(fragmentPersonReviews, props.personReviews);

  const members = useMemo(() => uniqueByUser([...getReviewee(projectReviews), ...getReviewee(personReviews)]), [
    personReviews,
    projectReviews,
  ]);

  return (
    <List component="nav">
      {members.map(member => (
        <MembersListItem key={member.id} member={member} />
      ))}
    </List>
  );
}
const fragmentProjectReviews = graphql`
  fragment MembersList_projectReviews on ProjectReviewNode @relay(plural: true) {
    reviewee {
      id
      ...MembersListItem_user
    }
  }
`;

const fragmentPersonReviews = graphql`
  fragment MembersList_personReviews on PersonReviewNode @relay(plural: true) {
    reviewee {
      id
      ...MembersListItem_user
    }
  }
`;
