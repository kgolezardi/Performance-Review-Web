import { indexBy } from 'ramda';
import { useMemo } from 'react';
import { useMemberListContext } from 'src/shared/members-list';

interface Review {
  reviewee: {
    id: string;
  };
}

const getReviewId = (review: Review) => review.reviewee.id;

export function useDominantCharacteristics<R extends Review = Review>(personReviews: ReadonlyArray<R>): R | null {
  const { selectedId } = useMemberListContext();
  const dominantCharacteristics = useMemo(() => indexBy(getReviewId, personReviews), [personReviews]);

  return selectedId !== null ? dominantCharacteristics[selectedId] : null;
}
