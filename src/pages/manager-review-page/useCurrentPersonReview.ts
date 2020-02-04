import { indexBy } from 'ramda';
import { useMemo } from 'react';
import { useMemberListContext } from 'src/shared/members-list';

interface Review {
  reviewee: {
    id: string;
  };
}

const getReviewId = (review: Review) => review.reviewee.id;

export function useCurrentPersonReview<R extends Review = Review>(personReviews: ReadonlyArray<R>): R | null {
  const { selectedId } = useMemberListContext();
  const indexedPersonReviews = useMemo(() => indexBy(getReviewId, personReviews), [personReviews]);

  return selectedId !== null ? indexedPersonReviews[selectedId] : null;
}
