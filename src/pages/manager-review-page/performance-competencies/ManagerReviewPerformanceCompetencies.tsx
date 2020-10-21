import graphql from 'babel-plugin-relay/macro';
import React, { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import { CriteriaHelpText } from 'src/shared/criteria-help-text';
import { DictInput, Forminator, SubmitButton } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXContext } from '@mdx-js/react';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { SectionGuide } from 'src/shared/section-guide';
import { ServerValueProvider } from 'src/shared/server-value';
import { StickyBottomPaper } from 'src/shared/sticky-bottom-paper';
import { UserType } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { isNotNil } from 'src/shared/utils/general.util';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useInView } from 'react-intersection-observer';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';
import { usePromptStateContext } from 'src/shared/prompt/PromptProvider';

import { ManagerReviewPerformanceCompetenciesExpansionPanel } from './ManagerReviewPerformanceCompetenciesExpansionPanel';
import { ManagerReviewPerformanceCompetenciesMutation } from './__generated__/ManagerReviewPerformanceCompetenciesMutation.graphql';
import { ManagerReviewPerformanceCompetenciesQuery } from './__generated__/ManagerReviewPerformanceCompetenciesQuery.graphql';
import { ManagerReviewPerformanceCompetenciesValue } from './ManagerReviewPerformanceCompetenciesValue';

const ManagerReviewPerformanceCompetenciesDescription = importMDX.sync(
  './ManagerReviewPerformanceCompetenciesDescription.mdx',
);

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

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

export function ManagerReviewPerformanceCompetencies(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ManagerReviewPerformanceCompetenciesQuery>(query, { id: revieweeId });
  const savePersonReview = useMutation<ManagerReviewPerformanceCompetenciesMutation>(graphql`
    mutation ManagerReviewPerformanceCompetenciesMutation($input: SaveManagerPersonReviewMutationInput!) {
      saveManagerPersonReview(input: $input) {
        managerPersonReview {
          id
          sahabinessRating
          problemSolvingRating
          executionRating
          thoughtLeadershipRating
          leadershipRating
          presenceRating
        }
      }
    }
  `);

  const components = useContext(MDXContext);
  const [, inView] = useInView();
  const { enqueueSnackbar } = useBiDiSnackbar();

  const value: ManagerReviewPerformanceCompetenciesValue = {};
  for (const key in data.viewer.user?.managerPersonReview) {
    Object.assign(value, {
      [key]:
        data.viewer.user?.managerPersonReview?.[key as keyof ManagerReviewPerformanceCompetenciesValue] ?? undefined,
    });
  }

  const handleSubmit = (data: ManagerReviewPerformanceCompetenciesValue) => {
    savePersonReview({ input: { revieweeId: revieweeId, ...data } })
      .then((data) => {
        enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
      });
  };

  const { changed } = usePromptStateContext();
  const disabled = !changed;

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
            <StickyBottomPaper noSticky={inView}>
              <Box display="flex">
                <Box flex={1}>
                  <Typography>
                    {i18n._('You have evaluated {number} from {total} performance competencies criteria.', {
                      number: Object.values(value).filter(isNotNil).length,
                      total: 6,
                    })}
                  </Typography>
                </Box>
                <SubmitButton variant="contained" color="primary" disabled={disabled}>
                  {i18n._('Save')}
                </SubmitButton>
              </Box>
            </StickyBottomPaper>
          </DictInput>
        </Forminator>
      </ServerValueProvider>
    </Box>
  );
}
