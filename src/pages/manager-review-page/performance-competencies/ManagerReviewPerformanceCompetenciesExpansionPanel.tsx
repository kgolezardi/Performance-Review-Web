import graphql from 'babel-plugin-relay/macro';
import React, { ReactNode } from 'react';
import { Box, Typography } from '@material-ui/core';
import { DictInputItem, FragmentPrompt } from 'src/shared/forminator';
import { Evaluation } from 'src/__generated__/enums';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'src/shared/expansion-panel';
import { FCProps } from 'src/shared/types/FCProps';
import { HelperText } from 'src/shared/helper-text/HelperText';
import { Rating } from 'src/shared/rating';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { getUserLabel_user$key } from 'src/shared/utils/__generated__/getUserLabel_user.graphql';
import { i18n } from '@lingui/core';
import { useFragment } from 'react-relay/hooks';
import { useServerValueContext } from 'src/shared/server-value';

import { ManagerReviewPerformanceCompetenciesExpansionPanel_reviews$key } from './__generated__/ManagerReviewPerformanceCompetenciesExpansionPanel_reviews.graphql';
import { ManagerReviewPerformanceCompetenciesRatingGroup } from './ManagerReviewPerformanceCompetenciesRatingGroup';

const fragment = graphql`
  fragment ManagerReviewPerformanceCompetenciesExpansionPanel_reviews on PersonReviewNode @relay(plural: true) {
    ...ManagerReviewPerformanceCompetenciesRatingGroup_reviews
  }
`;

interface ServerValue {
  [key: string]: string | null;
}

interface OwnProps {
  title: string;
  reviews: ManagerReviewPerformanceCompetenciesExpansionPanel_reviews$key;
  prefix: 'sahabiness' | 'problemSolving' | 'execution' | 'thoughtLeadership' | 'leadership' | 'presence';
  details?: ReactNode;
  reviewee: getUserLabel_user$key | null;
}

export type Props = FCProps<OwnProps>;

export function ManagerReviewPerformanceCompetenciesExpansionPanel(props: Props) {
  const { details, prefix, reviewee, title } = props;

  const reviews = useFragment(fragment, props.reviews);

  const serverValue = useServerValueContext<ServerValue>();
  const rating = (serverValue?.[prefix + 'Rating'] as Evaluation) || null;
  const name = reviewee ? getUserLabel(reviewee) : '';

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary>
        <Box display="flex" flexBasis="50%">
          <Typography variant="h3">{title}</Typography>
          <HelperText text={details} />
        </Box>
        <Box alignItems="center" display="flex" flexBasis="50%">
          <Box color="grey.700" marginRight={2}>
            <Typography>{i18n._('Evaluation:')}</Typography>
          </Box>
          <EvaluationOutput type="peer" value={rating} />
        </Box>
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
          <DictInputItem field={prefix + 'Rating'}>
            <Box bgcolor="grey.100" marginTop={4} padding={2}>
              <Box color="grey.700">
                <Typography gutterBottom>
                  {i18n._('Your evaluation of {name} on {criteria}', { name, criteria: title })}
                </Typography>
              </Box>
              <Box width="320px">
                <Rating inputLabel={i18n._('Evaluation')} type="peer" />
              </Box>
            </Box>
            <FragmentPrompt value={rating} />
          </DictInputItem>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
