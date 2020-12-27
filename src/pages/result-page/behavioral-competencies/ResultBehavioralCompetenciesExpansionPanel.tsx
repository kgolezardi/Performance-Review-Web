import graphql from 'babel-plugin-relay/macro';
import React, { ReactNode } from 'react';
import { BehavioralCompetenciesPrefix } from 'src/global-types';
import { Box, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { HelperText } from 'src/shared/helper-text/HelperText';
import { useFragment } from 'react-relay/hooks';

import { ResultBehavioralCompetenciesExpansionPanel_reviews$key } from './__generated__/ResultBehavioralCompetenciesExpansionPanel_reviews.graphql';
import { ResultBehavioralCompetenciesRatingGroup } from './ResultBehavioralCompetenciesRatingGroup';

const fragment = graphql`
  fragment ResultBehavioralCompetenciesExpansionPanel_reviews on PersonReviewNode @relay(plural: true) {
    ...ResultBehavioralCompetenciesRatingGroup_reviews
  }
`;

interface OwnProps {
  title: string;
  reviews: ResultBehavioralCompetenciesExpansionPanel_reviews$key;
  prefix: BehavioralCompetenciesPrefix;
  details?: ReactNode;
}

export type Props = FCProps<OwnProps>;

export function ResultBehavioralCompetenciesExpansionPanel(props: Props) {
  const { details, title } = props;

  const reviews = useFragment(fragment, props.reviews);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h3">{title}</Typography>
        <HelperText text={details} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box width="100%">
          <ResultBehavioralCompetenciesRatingGroup rating="SUPERB" prefix={props.prefix} reviews={reviews} />
          <ResultBehavioralCompetenciesRatingGroup
            rating="EXCEEDS_EXPECTATIONS"
            prefix={props.prefix}
            reviews={reviews}
          />
          <ResultBehavioralCompetenciesRatingGroup
            rating="MEETS_EXPECTATIONS"
            prefix={props.prefix}
            reviews={reviews}
          />
          <ResultBehavioralCompetenciesRatingGroup rating="NEEDS_IMPROVEMENT" prefix={props.prefix} reviews={reviews} />
          <ResultBehavioralCompetenciesRatingGroup rating={null} prefix={props.prefix} reviews={reviews} />
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
