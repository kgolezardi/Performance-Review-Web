import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';
import { StrengthsWeaknessesForm } from './StrengthsWeaknessesForm';
import { useMutation } from 'src/relay';
import graphql from 'babel-plugin-relay/macro';
import { StrengthsWeaknessesPageMutation } from './__generated__/StrengthsWeaknessesPageMutation.graphql';
import { useAuthGuardUser } from 'src/core/auth';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { StrengthsWeaknessesPageQuery } from 'src/pages/strengths-weaknesses-page/__generated__/StrengthsWeaknessesPageQuery.graphql';
import { isNotNil } from 'src/shared/utils/general.util';

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

const query = graphql`
  query StrengthsWeaknessesPageQuery($id: ID!) {
    viewer {
      findPersonReview(revieweeId: $id) {
        strengths
        weaknesses
      }
    }
  }
`;

const transformData = (data: StrengthsWeaknessesFormData) => {
  const strengths = data.strengths?.filter(val => !!val);
  const weaknesses = data.weaknesses?.filter(val => !!val);

  return {
    strengths: strengths ? strengths : [],
    weaknesses: weaknesses ? weaknesses : [],
  };
};

const normalizeArray = (array: readonly (string | null)[] | null | undefined) => {
  if (array && array.length) {
    return array.filter<string>(isNotNil);
  }
  return undefined;
};

export function StrengthsWeaknessesPage() {
  const strengthsWeaknessesPageMutation = useStrengthsWeaknessesPageMutation();
  const { id: revieweeId } = useAuthGuardUser();
  const data = useLazyLoadQuery<StrengthsWeaknessesPageQuery>(query, { id: revieweeId });
  const review = data.viewer.findPersonReview;

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
      <StrengthsWeaknessesForm
        onSubmit={handleSubmit}
        initialValue={{
          strengths: normalizeArray(review?.strengths),
          weaknesses: normalizeArray(review?.weaknesses),
        }}
      />
    </Container>
  );
}

export interface StrengthsWeaknessesFormData {
  strengths?: string[];
  weaknesses?: string[];
}
