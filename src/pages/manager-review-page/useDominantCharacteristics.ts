import { indexBy } from 'ramda';
import { useMemo } from 'react';
import { useMemberListContext } from 'src/shared/members-list';
import { ElementType } from 'src/shared/types/ElementType';
import {
  ManagerReviewContent_personReviews,
  ManagerReviewContent_personReviews$data,
} from './__generated__/ManagerReviewContent_personReviews.graphql';

const getReviewId = (review: ElementType<ManagerReviewContent_personReviews>) => review.reviewee.id;

export function useDominantCharacteristics(personReviews: ManagerReviewContent_personReviews$data) {
  const { selectedId } = useMemberListContext();
  const dominantCharacteristics = useMemo(() => indexBy(getReviewId, personReviews), [personReviews]);

  return selectedId !== null ? dominantCharacteristics[selectedId] : null;
}
