import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { Box, Divider, Paper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MultilineOutput } from 'src/shared/multiline-output';
import { selfReviewEvaluationDictionary } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';

import { ProjectResultRationGroup_comments$key } from './__generated__/ProjectResultRationGroup_comments.graphql';

interface OwnProps {
  comments: ProjectResultRationGroup_comments$key;
  rating: 'EXCEEDS_EXPECTATIONS' | 'MEETS_EXPECTATIONS' | 'NEEDS_IMPROVEMENT' | 'SUPERB';
}

export type Props = FCProps<OwnProps>;

const fragment = graphql`
  fragment ProjectResultRationGroup_comments on ProjectCommentNode @relay(plural: true) {
    id
    rating
    text
  }
`;

export function ProjectResultRationGroup(props: Props) {
  const { rating } = props;
  const comments = useFragment(fragment, props.comments);
  const ratingComments = useMemo(() => {
    return comments.filter((comment) => {
      return comment.rating === rating && comment.text;
    });
  }, [rating, comments]);
  if (ratingComments.length === 0) {
    return null;
  }
  const title = selfReviewEvaluationDictionary[rating];

  return (
    <Box mt={4}>
      <h2>{title}</h2>
      {ratingComments.map((review: any) => (
        <Box mt={2} key={review.id}>
          <Paper style={{ backgroundColor: '#F0F0F0', padding: 8 }}>
            <MultilineOutput value={review.text} />
          </Paper>
        </Box>
      ))}

      <Divider />
    </Box>
  );
}
