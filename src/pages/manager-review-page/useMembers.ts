import graphql from 'babel-plugin-relay/macro';
import { map, prop, uniqBy } from 'ramda';
import { useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { ElementType } from 'src/shared/types/ElementType';
import {
  useMembers_personReviews,
  useMembers_personReviews$key,
} from './__generated__/useMembers_personReviews.graphql';
import {
  useMembers_projectReviews,
  useMembers_projectReviews$key,
} from './__generated__/useMembers_projectReviews.graphql';

type UserType = ElementType<useMembers_personReviews | useMembers_projectReviews>['reviewee'];
const getReviewee = map(prop('reviewee'));
const uniqueByUser = uniqBy<UserType, string>(prop('id'));

export function useMembers(
  projectReviewsFragment: useMembers_projectReviews$key,
  personReviewsFragment: useMembers_personReviews$key,
) {
  const projectReviews = useFragment(fragmentProjectReviews, projectReviewsFragment);
  const personReviews = useFragment(fragmentPersonReviews, personReviewsFragment);

  return useMemo(() => uniqueByUser([...getReviewee(projectReviews), ...getReviewee(personReviews)]), [
    personReviews,
    projectReviews,
  ]);
}

const fragmentProjectReviews = graphql`
  fragment useMembers_projectReviews on ProjectReviewNode @relay(plural: true) {
    reviewee {
      id
      ...MembersList_user
    }
  }
`;

const fragmentPersonReviews = graphql`
  fragment useMembers_personReviews on PersonReviewNode @relay(plural: true) {
    reviewee {
      id
      ...MembersList_user
    }
  }
`;
