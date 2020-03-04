import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { CriteriaOutput } from 'src/shared/criteria-output';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';

import { CriteriaForm } from './CriteriaForm';
import { CriteriaFormData } from './CriteriaFormData';
import { CriteriaPageMutation } from './__generated__/CriteriaPageMutation.graphql';
import { CriteriaPageQuery } from './__generated__/CriteriaPageQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const useCriteriaPageMutation = () =>
  useMutation<CriteriaPageMutation>(graphql`
    mutation CriteriaPageMutation($input: SavePersonReviewMutationInput!) {
      savePersonReview(input: $input) {
        personReview {
          id
          state
          ...PerformanceCompetenciesCircularIndicator_review
          ...DominantCharacteristicsCircularIndicator_review
        }
      }
    }
  `);

const query = graphql`
  query CriteriaPageQuery($id: ID!) {
    viewer {
      review: findPersonReview(revieweeId: $id) {
        reviewee {
          id
          ...CriteriaForm_user
        }
        ...CriteriaOutput_review
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
        isSelfReview
        state
      }
    }
  }
`;

export default function CriteriaPage(props: Props) {
  const { revieweeId } = props;
  const { enqueueSnackbar } = useBiDiSnackbar();
  const criteriaPageMutation = useCriteriaPageMutation();

  const data = useLazyLoadQuery<CriteriaPageQuery>(query, { id: revieweeId });

  const handleSubmit = useCallback(
    (data: CriteriaFormData) => {
      const input = { input: { revieweeId, ...data } };
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
    <Box padding={4}>
      {review?.state === 'DONE' ? (
        <CriteriaOutput review={review} />
      ) : (
        <CriteriaForm
          onSubmit={handleSubmit}
          user={review?.reviewee ?? null}
          initialValue={{
            // TODO: use fragment
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
          isSelfReview={review?.isSelfReview || false}
        />
      )}
    </Box>
  );
}
