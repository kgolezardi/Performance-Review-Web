import { Container } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { useAuthGuardUser } from 'src/core/auth/UserContext';
import { CriteriaForm } from 'src/pages/criteria-page/CriteriaForm';
import { CriteriaPageMutation, Evaluation } from 'src/pages/criteria-page/__generated__/CriteriaPageMutation.graphql';
import { useMutation } from 'src/relay';
import { FCProps } from 'src/shared/types/FCProps';

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

export function CriteriaPage(props: Props) {
  const criteriaPageMutation = useCriteriaPageMutation();

  const { id: revieweeId } = useAuthGuardUser();

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
        .then(res => {})
        .catch(error => {});
    },
    [criteriaPageMutation, revieweeId],
  );

  return (
    <Container>
      <CriteriaForm onSubmit={handleSubmit} />
    </Container>
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
