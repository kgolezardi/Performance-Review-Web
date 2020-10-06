import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { CriteriaHelpText } from 'src/shared/criteria-help-text';
import { DictInput, Forminator } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { SectionGuide } from 'src/shared/section-guide';
import { ServerValueProvider } from 'src/shared/server-value';
import { UserType } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewPerformanceCompetenciesExpansionPanel } from './ManagerReviewPerformanceCompetenciesExpansionPanel';
import { ManagerReviewPerformanceCompetenciesQuery } from './__generated__/ManagerReviewPerformanceCompetenciesQuery.graphql';
import { ManagerReviewPerformanceCompetenciesValue } from './ManagerReviewPerformanceCompetenciesValue';

const ManagerReviewPerformanceCompetenciesDescription = importMDX.sync(
  './ManagerReviewPerformanceCompetenciesDescription.mdx',
);

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const query = graphql`
  query ManagerReviewPerformanceCompetenciesQuery($id: ID!) {
    viewer {
      user(id: $id) {
        ...getUserLabel_user
        managerPersonReview {
          sahabinessRating
          problemSolvingRating
          executionRating
          thoughtLeadershipRating
          leadershipRating
          presenceRating
        }
        personReviews {
          ...ManagerReviewPerformanceCompetenciesExpansionPanel_reviews
        }
      }
    }
  }
`;

export function ManagerReviewPerformanceCompetencies(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ManagerReviewPerformanceCompetenciesQuery>(query, { id: revieweeId });
  const components = useContext(MDXContext);

  const value: ManagerReviewPerformanceCompetenciesValue = {};
  for (const key in data.viewer.user?.managerPersonReview) {
    Object.assign(value, {
      [key]:
        data.viewer.user?.managerPersonReview?.[key as keyof ManagerReviewPerformanceCompetenciesValue] ?? undefined,
    });
  }

  // TODO: Submit mutation
  const handleSubmit = () => {};

  const reviews = data.viewer.user?.personReviews;
  if (!reviews) {
    return <Box padding={4}>no data</Box>;
  }
  return (
    <Box padding={4}>
      <SectionGuide>
        <MDXPropsProvider<UserType | null> value={data.viewer.user || null}>
          <ManagerReviewPerformanceCompetenciesDescription components={components} />
        </MDXPropsProvider>
      </SectionGuide>
      <ServerValueProvider value={value}>
        <Forminator onSubmit={handleSubmit} initialValue={value}>
          <DictInput>
            <ManagerReviewPerformanceCompetenciesExpansionPanel
              reviews={reviews}
              details={<CriteriaHelpText criteria="sahabiness" isSelfReview={false} />}
              title={i18n._('Organization Culture Adoption')}
              prefix="sahabiness"
              reviewee={data.viewer.user}
            />
            <ManagerReviewPerformanceCompetenciesExpansionPanel
              reviews={reviews}
              details={<CriteriaHelpText criteria="problemSolving" isSelfReview={false} />}
              title={i18n._('Problem Solving')}
              prefix="problemSolving"
              reviewee={data.viewer.user}
            />
            <ManagerReviewPerformanceCompetenciesExpansionPanel
              reviews={reviews}
              details={<CriteriaHelpText criteria="execution" isSelfReview={false} />}
              title={i18n._('Execution')}
              prefix="execution"
              reviewee={data.viewer.user}
            />
            <ManagerReviewPerformanceCompetenciesExpansionPanel
              reviews={reviews}
              details={<CriteriaHelpText criteria="thoughtLeadership" isSelfReview={false} />}
              title={i18n._('Thought Leadership')}
              prefix="thoughtLeadership"
              reviewee={data.viewer.user}
            />
            <ManagerReviewPerformanceCompetenciesExpansionPanel
              reviews={reviews}
              details={<CriteriaHelpText criteria="leadership" isSelfReview={false} />}
              title={i18n._('Leadership')}
              prefix="leadership"
              reviewee={data.viewer.user}
            />
            <ManagerReviewPerformanceCompetenciesExpansionPanel
              reviews={reviews}
              details={<CriteriaHelpText criteria="presence" isSelfReview={false} />}
              title={i18n._('Presence')}
              prefix="presence"
              reviewee={data.viewer.user}
            />
          </DictInput>
        </Forminator>
      </ServerValueProvider>
    </Box>
  );
}
