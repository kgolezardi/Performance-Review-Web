import graphql from 'babel-plugin-relay/macro';
import React, { ReactNode } from 'react';
import { Box, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { HelperText } from 'src/shared/helper-text/HelperText';
import { useFragment } from 'react-relay/hooks';

import { ManagerReviewPerformanceCompetenciesExpansionPanel_reviews$key } from './__generated__/ManagerReviewPerformanceCompetenciesExpansionPanel_reviews.graphql';
import { ManagerReviewPerformanceCompetenciesRatingGroup } from './ManagerReviewPerformanceCompetenciesRatingGroup';

const fragment = graphql`
  fragment ManagerReviewPerformanceCompetenciesExpansionPanel_reviews on PersonReviewNode @relay(plural: true) {
    ...ManagerReviewPerformanceCompetenciesRatingGroup_reviews
  }
`;

interface OwnProps {
  title: string;
  reviews: ManagerReviewPerformanceCompetenciesExpansionPanel_reviews$key;
  prefix: 'sahabiness' | 'problemSolving' | 'execution' | 'thoughtLeadership' | 'leadership' | 'presence';
  details?: ReactNode;
}

export type Props = FCProps<OwnProps>;

export function ManagerReviewPerformanceCompetenciesExpansionPanel(props: Props) {
  const { details, prefix, title } = props;

  const reviews = useFragment(fragment, props.reviews);

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Typography variant="h3">{title}</Typography>
        <HelperText text={details} />
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box width="100%">
          <ManagerReviewPerformanceCompetenciesRatingGroup rating="SUPERB" prefix={prefix} reviews={reviews} />
          <ManagerReviewPerformanceCompetenciesRatingGroup
            rating="EXCEEDS_EXPECTATIONS"
            prefix={prefix}
            reviews={reviews}
          />
          <ManagerReviewPerformanceCompetenciesRatingGroup
            rating="MEETS_EXPECTATIONS"
            prefix={prefix}
            reviews={reviews}
          />
          <ManagerReviewPerformanceCompetenciesRatingGroup
            rating="NEEDS_IMPROVEMENT"
            prefix={prefix}
            reviews={reviews}
          />
          <ManagerReviewPerformanceCompetenciesRatingGroup rating={null} prefix={prefix} reviews={reviews} />
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
