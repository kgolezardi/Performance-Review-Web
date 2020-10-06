import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { CriteriaHelpText } from 'src/shared/criteria-help-text';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { SectionGuide } from 'src/shared/section-guide';
import { UserType } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { useLazyLoadQuery } from 'react-relay/hooks';

import { ManagerReviewPerformanceCompetenciesExpansionPanel } from './ManagerReviewPerformanceCompetenciesExpansionPanel';
import { ManagerReviewPerformanceCompetenciesQuery } from './__generated__/ManagerReviewPerformanceCompetenciesQuery.graphql';

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
      <ManagerReviewPerformanceCompetenciesExpansionPanel
        reviews={reviews}
        details={<CriteriaHelpText criteria="sahabiness" isSelfReview={false} />}
        title={i18n._('Organization Culture Adoption')}
        prefix="sahabiness"
      />
      <ManagerReviewPerformanceCompetenciesExpansionPanel
        reviews={reviews}
        details={<CriteriaHelpText criteria="problemSolving" isSelfReview={false} />}
        title={i18n._('Problem Solving')}
        prefix="problemSolving"
      />
      <ManagerReviewPerformanceCompetenciesExpansionPanel
        reviews={reviews}
        details={<CriteriaHelpText criteria="execution" isSelfReview={false} />}
        title={i18n._('Execution')}
        prefix="execution"
      />
      <ManagerReviewPerformanceCompetenciesExpansionPanel
        reviews={reviews}
        details={<CriteriaHelpText criteria="thoughtLeadership" isSelfReview={false} />}
        title={i18n._('Thought Leadership')}
        prefix="thoughtLeadership"
      />
      <ManagerReviewPerformanceCompetenciesExpansionPanel
        reviews={reviews}
        details={<CriteriaHelpText criteria="leadership" isSelfReview={false} />}
        title={i18n._('Leadership')}
        prefix="leadership"
      />
      <ManagerReviewPerformanceCompetenciesExpansionPanel
        reviews={reviews}
        details={<CriteriaHelpText criteria="presence" isSelfReview={false} />}
        title={i18n._('Presence')}
        prefix="presence"
      />
    </Box>
  );
}
