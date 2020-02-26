import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { FCProps } from 'src/shared/types/FCProps';
import { Grid } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';

import { CharacteristicsList } from './CharacteristicsList';
import { DominantCharacteristicsOutput_review$key } from './__generated__/DominantCharacteristicsOutput_review.graphql';

export const fragment = graphql`
  fragment DominantCharacteristicsOutput_review on PersonReviewNode {
    strengths
    weaknesses
  }
`;

interface OwnProps {
  review: DominantCharacteristicsOutput_review$key | null;
}

type Props = FCProps<OwnProps>;

export function DominantCharacteristicsOutput(props: Props) {
  const review = useFragment(fragment, props.review);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <CharacteristicsList
          title={i18n._('The most important characteristics or effective behaviors that I should maintain')}
          characteristics={review?.strengths ?? null}
        />
      </Grid>
      <Grid item xs={12}>
        <CharacteristicsList
          title={i18n._('The most important characteristics or behaviors I should improve in myself')}
          characteristics={review?.weaknesses ?? null}
        />
      </Grid>
    </Grid>
  );
}
