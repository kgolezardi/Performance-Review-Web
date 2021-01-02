import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { BehavioralCompetencyHelpText } from 'src/shared/behavioral-competency-help-text';
import { Box, Grid } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { SectionGuide } from 'src/shared/section-guide';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ResultBehavioralCompetenciesExpansionPanel } from './ResultBehavioralCompetenciesExpansionPanel';
import { ResultBehavioralCompetenciesQuery } from './__generated__/ResultBehavioralCompetenciesQuery.graphql';

const ResultBehavioralCompetenciesDescription = importMDX.sync('./ResultBehavioralCompetenciesDescription.mdx');

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const query = graphql`
  query ResultBehavioralCompetenciesQuery($id: ID!) {
    viewer {
      user(id: $id) {
        personReviews {
          ...ResultBehavioralCompetenciesExpansionPanel_reviews
        }
      }
    }
  }
`;

export function ResultBehavioralCompetencies(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ResultBehavioralCompetenciesQuery>(query, { id: revieweeId });
  const components = useContext(MDXContext);

  const reviews = data.viewer.user?.personReviews;
  if (!reviews) {
    return <Box padding={4}>no data</Box>;
  }
  return (
    <Box padding={4}>
      <SectionGuide>
        <ResultBehavioralCompetenciesDescription components={components} />
      </SectionGuide>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <ResultBehavioralCompetenciesExpansionPanel
            reviews={reviews}
            details={<BehavioralCompetencyHelpText criteria="sahabiness" isSelfReview />}
            title={i18n._('Organization Culture Adoption')}
            prefix="sahabiness"
          />
        </Grid>
        <Grid item xs={12}>
          <ResultBehavioralCompetenciesExpansionPanel
            reviews={reviews}
            details={<BehavioralCompetencyHelpText criteria="problemSolving" isSelfReview />}
            title={i18n._('Problem Solving')}
            prefix="problemSolving"
          />
        </Grid>
        <Grid item xs={12}>
          <ResultBehavioralCompetenciesExpansionPanel
            reviews={reviews}
            details={<BehavioralCompetencyHelpText criteria="execution" isSelfReview />}
            title={i18n._('Output Quality')}
            prefix="execution"
          />
        </Grid>
        <Grid item xs={12}>
          <ResultBehavioralCompetenciesExpansionPanel
            reviews={reviews}
            details={<BehavioralCompetencyHelpText criteria="thoughtLeadership" isSelfReview />}
            title={i18n._('Thought Leadership')}
            prefix="thoughtLeadership"
          />
        </Grid>
        <Grid item xs={12}>
          <ResultBehavioralCompetenciesExpansionPanel
            reviews={reviews}
            details={<BehavioralCompetencyHelpText criteria="leadership" isSelfReview />}
            title={i18n._('Leadership')}
            prefix="leadership"
          />
        </Grid>
        <Grid item xs={12}>
          <ResultBehavioralCompetenciesExpansionPanel
            reviews={reviews}
            details={<BehavioralCompetencyHelpText criteria="presence" isSelfReview />}
            title={i18n._('Presence')}
            prefix="presence"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
