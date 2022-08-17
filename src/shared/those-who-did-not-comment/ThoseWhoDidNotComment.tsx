import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Typography } from '@material-ui/core';
import { ReviewAvatarGroup } from 'src/shared/review-avatar-group';
import { i18n } from '@lingui/core';
import { isNotNil } from 'src/shared/utils/general.util';
import { useFragment } from 'react-relay/hooks';

import { ThoseWhoDidNotComment_comments$key } from './__generated__/ThoseWhoDidNotComment_comments.graphql';
import { getUserLabel } from '../utils/getUserLabel';
import { usePrintingContext } from '../layouts/dashboard-layouts/PrintingContext';

const fragment = graphql`
  fragment ThoseWhoDidNotComment_comments on ProjectCommentNode @relay(plural: true) {
    id
    rating
    answers {
      questionId
      value
    }
    reviewer {
      avatarUrl
      ...getUserLabel_user
    }
  }
`;

interface OwnProps {
  comments: ThoseWhoDidNotComment_comments$key;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ThoseWhoDidNotComment(props: Props) {
  const comments = useFragment(fragment, props.comments);

  const emptyComments = comments.filter((comment) => !comment.rating && !comment.answers.some(Boolean));
  const reviewers = emptyComments.map((review) => review.reviewer).filter(isNotNil);
  const printing = usePrintingContext();
  const reviewAvatars = reviewers.map((reviewer) => ({
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
