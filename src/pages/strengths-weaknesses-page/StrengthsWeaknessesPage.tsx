import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';
import { StrengthsWeaknessesForm } from './StrengthsWeaknessesForm';
import { useMutation } from 'src/relay';
import graphql from 'babel-plugin-relay/macro';
import { StrengthsWeaknessesPageMutation } from './__generated__/StrengthsWeaknessesPageMutation.graphql';
import { useAuthGuardUser } from 'src/core/auth';

const useStrengthsWeaknessesPageMutation = () =>
  useMutation<StrengthsWeaknessesPageMutation>(graphql`
    mutation StrengthsWeaknessesPageMutation($input: SavePersonReviewMutationInput!) {
      savePersonReview(input: $input) {
        personReview {
          id
        }
      }
    }
  `);

const transformData = (data: StrengthsWeaknessesFormData) => {
  const strengths = data.strengths?.filter(val => !!val);
  const weaknesses = data.weaknesses?.filter(val => !!val);

  return {
    strengths: strengths ? strengths : [],
    weaknesses: weaknesses ? weaknesses : [],
  };
};

export function StrengthsWeaknessesPage() {
  const strengthsWeaknessesPageMutation = useStrengthsWeaknessesPageMutation();

  const { id: revieweeId } = useAuthGuardUser();

  const handleSubmit = useCallback(
    (data: StrengthsWeaknessesFormData) => {
      const transformedData = transformData(data);

      const input = { input: { revieweeId, ...transformedData } };
      strengthsWeaknessesPageMutation(input)
        .then(() => {})
        .catch(() => {});
    },
    [strengthsWeaknessesPageMutation, revieweeId],
  );
  return (
    <Container>
      <StrengthsWeaknessesForm onSubmit={handleSubmit} />
    </Container>
  );
}

export interface StrengthsWeaknessesFormData {
  strengths?: string[];
  weaknesses?: string[];
}
