import graphql from 'babel-plugin-relay/macro';
import { indexBy } from 'ramda';
import { useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { ElementType } from 'src/shared/types/ElementType';
import {
  useDominantCharacteristics_projectReviews,
  useDominantCharacteristics_projectReviews$key,
} from './__generated__/useDominantCharacteristics_projectReviews.graphql';

const getReviewId = (review: ElementType<useDominantCharacteristics_projectReviews>) => review.reviewee.id;

export function useDominantCharacteristics(
  personReviewsFragment: useDominantCharacteristics_projectReviews$key,
  selectedUserId: string | null,
) {
  const personReviews = useFragment(fragment, personReviewsFragment);
  const dominantCharacteristics = useMemo(() => indexBy(getReviewId, personReviews), [personReviews]);
  return selectedUserId !== null ? dominantCharacteristics[selectedUserId] : null;
}

const fragment = graphql`
  fragment useDominantCharacteristics_projectReviews on PersonReviewNode @relay(plural: true) {
    reviewee {
      id
    }
    ...DominantCharacteristicsManagerReview_review
  }
`;
