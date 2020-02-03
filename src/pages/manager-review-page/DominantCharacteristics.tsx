import { i18n } from '@lingui/core';
import { Box, Grid } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { DominantCharacteristicsManagerReview_review$key } from './__generated__/DominantCharacteristicsManagerReview_review.graphql';
import { CharacteristicsOutput } from './CharacteristicsOutput';

interface OwnProps {
  review: DominantCharacteristicsManagerReview_review$key;
}

type Props = FCProps<OwnProps>;

export function DominantCharacteristicsManagerReview(props: Props) {
  const review = useFragment(fragment, props.review);

  return (
    <Box padding={3}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CharacteristicsOutput
            title={i18n._('Most important characteristics or effective behaviours that I should maintain')}
            characteristics={review.strengths}
          />
        </Grid>
        <Grid item xs={12}>
          <CharacteristicsOutput
            title={i18n._('Most important characteristics or effective behaviours that I should maintain')}
            characteristics={review.weaknesses}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export const fragment = graphql`
  fragment DominantCharacteristicsManagerReview_review on PersonReviewNode {
    strengths
    weaknesses
  }
`;
