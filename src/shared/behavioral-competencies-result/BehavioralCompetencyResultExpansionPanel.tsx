import graphql from 'babel-plugin-relay/macro';
import React, { ReactNode } from 'react';
import { BehavioralCompetenciesPrefix } from 'src/global-types';
import { Box, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { HelperText } from 'src/shared/helper-text/HelperText';
import { useFragment } from 'react-relay/hooks';

import { BehavioralCompetencyResultExpansionPanel_reviews$key } from './__generated__/BehavioralCompetencyResultExpansionPanel_reviews.graphql';
import { BehavioralCompetencyResultRatingGroup } from './BehavioralCompetencyResultRatingGroup';

const fragment = graphql`
  fragment BehavioralCompetencyResultExpansionPanel_reviews on PersonReviewNode @relay(plural: true) {
    ...BehavioralCompetencyResultRatingGroup_reviews
  }
`;

interface OwnProps {
  title: string;
  reviews: BehavioralCompetencyResultExpansionPanel_reviews$key;
  prefix: BehavioralCompetenciesPrefix;
  details?: ReactNode;
}

export type Props = FCProps<OwnProps>;

export function BehavioralCompetencyResultExpansionPanel(props: Props) {
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
          <BehavioralCompetencyResultRatingGroup rating="SUPERB" prefix={props.prefix} reviews={reviews} />
          <BehavioralCompetencyResultRatingGroup
            rating="EXCEEDS_EXPECTATIONS"
            prefix={props.prefix}
            reviews={reviews}
          />
          <BehavioralCompetencyResultRatingGroup rating="MEETS_EXPECTATIONS" prefix={props.prefix} reviews={reviews} />
          <BehavioralCompetencyResultRatingGroup rating="NEEDS_IMPROVEMENT" prefix={props.prefix} reviews={reviews} />
          <BehavioralCompetencyResultRatingGroup rating={null} prefix={props.prefix} reviews={reviews} />
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
