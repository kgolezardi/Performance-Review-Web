import { Box, Container } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { Suspense, useCallback } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { CriteriaPageQuery } from 'src/pages/criteria-page/__generated__/CriteriaPageQuery.graphql';
import { useMutation } from 'src/relay';
import { FullPageSpinner } from 'src/shared/loading';
import { FCProps } from 'src/shared/types/FCProps';
import { CriteriaForm } from './CriteriaForm';
import { CriteriaPageMutation, Evaluation } from './__generated__/CriteriaPageMutation.graphql';
import { useSnackbar } from 'notistack';
import { i18n } from '@lingui/core';

interface OwnProps {}

type Props = FCProps<OwnProps>;

const useCriteriaPageMutation = () =>
  useMutation<CriteriaPageMutation>(graphql`
    mutation CriteriaPageMutation($input: SavePersonReviewMutationInput!) {
      savePersonReview(input: $input) {
        personReview {
          id
        }
      }
    }
  `);

const query = graphql`
  query CriteriaPageQuery($id: ID!) {
    viewer {
      review: findPersonReview(revieweeId: $id) {
        sahabinessComment
        problemSolvingComment
        executionComment
        thoughtLeadershipComment
        leadershipComment
        presenceComment
        sahabinessRating
        problemSolvingRating
        executionRating
        thoughtLeadershipRating
        leadershipRating
        presenceRating
      }
    }
  }
`;

export default function CriteriaPage(props: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const criteriaPageMutation = useCriteriaPageMutation();

  const { id: revieweeId } = useAuthGuardUser();
  const data = useLazyLoadQuery<CriteriaPageQuery>(query, { id: revieweeId });

  const transformData = (data: CriteriaFormData) => {
    const entries = Object.entries(data);
    const transformedEntries = entries.map(([key, value]) => (value === '' ? [key, null] : [key, value]));
    return Object.fromEntries(transformedEntries);
  };

  const handleSubmit = useCallback(
    (data: CriteriaFormData) => {
      const transformedData = transformData(data);
      const input = { input: { revieweeId, ...transformedData } };
      criteriaPageMutation(input)
        .then(res => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch(error => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [criteriaPageMutation, revieweeId, enqueueSnackbar],
  );

  const review = data.viewer.review;

  return (
    <Suspense fallback={FullPageSpinner}>
      <Container maxWidth="sm">
        <Box marginY={2}>
          <CriteriaForm
            onSubmit={handleSubmit}
            initialValue={{
              executionComment: review?.executionComment || undefined,
              executionRating: review?.executionRating || undefined,
              leadershipComment: review?.leadershipComment || undefined,
              leadershipRating: review?.leadershipRating || undefined,
              presenceComment: review?.presenceComment || undefined,
              presenceRating: review?.presenceRating || undefined,
              problemSolvingComment: review?.problemSolvingComment || undefined,
              problemSolvingRating: review?.problemSolvingRating || undefined,
              sahabinessComment: review?.sahabinessComment || undefined,
              sahabinessRating: review?.sahabinessRating || undefined,
              thoughtLeadershipComment: review?.thoughtLeadershipComment || undefined,
              thoughtLeadershipRating: review?.thoughtLeadershipRating || undefined,
            }}
          />
        </Box>
      </Container>
    </Suspense>
  );
}

export interface CriteriaFormData {
  sahabinessRating?: Evaluation;
  sahabinessComment?: string;
  problemSolvingRating?: Evaluation;
  problemSolvingComment?: string;
  executionRating?: Evaluation;
  executionComment?: string;
  thoughtLeadershipRating?: Evaluation;
  thoughtLeadershipComment?: string;
  leadershipRating?: Evaluation;
  leadershipComment?: string;
  presenceRating?: Evaluation;
  presenceComment?: string;
}
