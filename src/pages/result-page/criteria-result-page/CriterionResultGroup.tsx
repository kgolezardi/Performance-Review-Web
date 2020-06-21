import React, { ReactNode } from 'react';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';

import { CriteriaResult_reviews$data } from './__generated__/CriteriaResult_reviews.graphql';
import { CriterionResultRatingGroup } from './CriterionResultRatingGroup';

interface OwnProps {
  title: string;
  reviews: CriteriaResult_reviews$data;
  prefix: 'sahabiness' | 'problemSolving' | 'execution' | 'thoughtLeadership' | 'leadership' | 'presence';
  details?: ReactNode;
}

export type Props = FCProps<OwnProps>;

export function CriterionResultGroup(props: Props) {
  const { details } = props;
  return (
    <Box mt={6}>
      <h1>{props.title}</h1>
      {details}
      <CriterionResultRatingGroup rating="SUPERB" prefix={props.prefix} reviews={props.reviews} />
      <CriterionResultRatingGroup rating="EXCEEDS_EXPECTATIONS" prefix={props.prefix} reviews={props.reviews} />
      <CriterionResultRatingGroup rating="MEETS_EXPECTATIONS" prefix={props.prefix} reviews={props.reviews} />
      <CriterionResultRatingGroup rating="NEEDS_IMPROVEMENT" prefix={props.prefix} reviews={props.reviews} />
    </Box>
  );
}
