import React, { useMemo } from 'react';
import { Box, Divider, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { sortBy } from 'ramda';

import { CriteriaResult_reviews$data } from './__generated__/CriteriaResult_reviews.graphql';
import { selfReviewEvaluationDictionary } from '../../../global-types';

interface OwnProps {
  reviews: CriteriaResult_reviews$data;
  rating: 'EXCEEDS_EXPECTATIONS' | 'MEETS_EXPECTATIONS' | 'NEEDS_IMPROVEMENT' | 'SUPERB';
  prefix: 'sahabiness' | 'problemSolving' | 'execution' | 'thoughtLeadership' | 'leadership' | 'presence';
}

export type Props = FCProps<OwnProps>;

export function CriterionResultRatingGroup(props: Props) {
  const { rating, prefix } = props;
  const reviews = useMemo((): CriteriaResult_reviews$data => {
    const ratingReviews = props.reviews.filter(
      (review: any) => review[prefix + 'Rating'] === rating && review[prefix + 'Comment'],
    );
    return sortBy((review: any) => review[prefix + 'Comment'] ?? '', ratingReviews);
  }, [props.reviews, rating, prefix]);
  if (reviews.length === 0) {
    return null;
  }
  const title = selfReviewEvaluationDictionary[rating];

  return (
    <Box mt={4}>
      <h2>{title}</h2>

      {reviews.map((review: any) => (
        <Box mt={2} key={review.id}>
          <Paper style={{ backgroundColor: review.isSelfReview ? '#F0F0C0' : '#F0F0F0', padding: 8 }}>
            <MultilineOutput value={review[prefix + 'Comment']} />
          </Paper>
        </Box>
      ))}

      <Divider />
    </Box>
  );
}
