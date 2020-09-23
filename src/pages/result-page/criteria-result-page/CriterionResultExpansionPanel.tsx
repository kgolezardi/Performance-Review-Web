import graphql from 'babel-plugin-relay/macro';
import React, { ReactNode } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from 'src/shared/expansion-panel';
import { Box, Typography } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { HelperText } from 'src/shared/helper-text/HelperText';
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
  prefix: 'sahabiness' | 'problemSolving' | 'execution' | 'thoughtLeadership' | 'leadership' | 'presence';
  details?: ReactNode;
}

export type Props = FCProps<OwnProps>;

export function CriterionResultExpansionPanel(props: Props) {
  const { details, title } = props;

  const reviews = useFragment(fragment, props.reviews);

  return (
    <Accordion>
      <AccordionSummary>
        <Typography variant="h3">{title}</Typography>
        {details && <HelperText text={details} />}
      </AccordionSummary>
      <AccordionDetails>
        <Box width="100%">
          <CriterionResultRatingGroup rating="SUPERB" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating="EXCEEDS_EXPECTATIONS" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating="MEETS_EXPECTATIONS" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating="NEEDS_IMPROVEMENT" prefix={props.prefix} reviews={reviews} />
          <CriterionResultRatingGroup rating={null} prefix={props.prefix} reviews={reviews} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
