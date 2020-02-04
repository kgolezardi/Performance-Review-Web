import { filter } from 'ramda';
import { useMemo } from 'react';
import { useMemberListContext } from 'src/shared/members-list';

interface Review {
  reviewee: {
    id: string;
  };
}

const getReviewId = (review: Review) => review.reviewee.id;

export function useCurrentProjectReviews<R extends Review = Review>(
  projectReviews: ReadonlyArray<R>,
): ReadonlyArray<R> {
  const { selectedId } = useMemberListContext();
  return useMemo(() => filter(projectReview => getReviewId(projectReview) === selectedId, projectReviews), [
    projectReviews,
    selectedId,
  ]);
}
