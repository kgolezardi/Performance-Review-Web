import graphql from 'babel-plugin-relay/macro';
import React, { ReactNode } from 'react';
import { Box, Typography } from '@material-ui/core';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { HelperText } from 'src/shared/helper-text/HelperText';
import { PerformanceCompetenciesPrefix } from 'src/global-types';
import { useFragment } from 'react-relay/hooks';

import { CriterionResultExpansionPanel_reviews$key } from './__generated__/CriterionResultExpansionPanel_reviews.graphql';
import { CriterionResultRatingGroup } from './CriterionResultRatingGroup';

const fragment = graphql`
  fragment CriterionResultExpansionPanel_reviews on PersonReviewNode @relay(plural: true) {
    ...CriterionResultRatingGroup_reviews
  }
`;

interface OwnProps {
  title: string;
  reviews: CriterionResultExpansionPanel_reviews$key;
  prefix: PerformanceCompetenciesPrefix;
  details?: ReactNode;
}

export type Props = FCProps<OwnProps>;

export function CriterionResultExpansionPanel(props: Props) {
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
          <CriterionResultRatingGroup rating="SUPERB" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating="EXCEEDS_EXPECTATIONS" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating="MEETS_EXPECTATIONS" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating="NEEDS_IMPROVEMENT" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating={null} prefix={props.prefix} reviews={reviews} />
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
