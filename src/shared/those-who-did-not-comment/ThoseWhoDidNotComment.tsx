import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Typography } from '@material-ui/core';
import { ReviewAvatarGroup } from 'src/shared/review-avatar-group';
import { differenceWith } from 'ramda';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { ThoseWhoDidNotComment_review$key } from './__generated__/ThoseWhoDidNotComment_review.graphql';
import { getUserLabel } from '../utils/getUserLabel';
import { usePrintingContext } from '../layouts/dashboard-layouts/PrintingContext';

const fragment = graphql`
  fragment ThoseWhoDidNotComment_review on ProjectReviewNode {
    reviewers {
      id
      avatarUrl
      ...getUserLabel_user
    }
    comments {
      id
      rating
      answers {
        questionId
        value
      }
      reviewer {
        id
      }
    }
  }
`;

interface OwnProps {
  review: ThoseWhoDidNotComment_review$key;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ThoseWhoDidNotComment(props: Props) {
  const review = useFragment(fragment, props.review);
  const reviewersByComments = review.comments
    .filter((comment) => comment.rating && comment.answers.some(Boolean))
    .map((comment) => comment.reviewer?.id);
  const reviewersByNoneComments = differenceWith((a, b) => a.id === b, review.reviewers, reviewersByComments);
  const printing = usePrintingContext();
  const reviewAvatars = reviewersByNoneComments.map((reviewer) => ({
    avatarUrl: reviewer.avatarUrl ?? undefined,
    name: getUserLabel(reviewer),
  }));

  if (!reviewAvatars.length || printing) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <Box marginTop={3}>
        <Typography variant="h5">{i18n._('Those who did not comment')}</Typography>
        <Box my={2}>
          <ReviewAvatarGroup users={reviewAvatars} />
        </Box>
      </Box>
    </Grid>
  );
}
