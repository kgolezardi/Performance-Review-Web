import { i18n } from '@lingui/core';
import { Box } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useAuthGuardUser } from 'src/core/auth';
import { StrengthsWeaknessesPageQuery } from 'src/pages/strengths-weaknesses-page/__generated__/StrengthsWeaknessesPageQuery.graphql';
import { useMutation } from 'src/relay';
import { PromptProvider } from 'src/shared/prompt';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { StrengthsWeaknessesPageMutation } from './__generated__/StrengthsWeaknessesPageMutation.graphql';
import { StrengthsWeaknessesForm } from './StrengthsWeaknessesForm';
import { normalizeArray } from './utils';

const useStrengthsWeaknessesPageMutation = () =>
  useMutation<StrengthsWeaknessesPageMutation>(graphql`
    mutation StrengthsWeaknessesPageMutation($input: SavePersonReviewMutationInput!) {
      savePersonReview(input: $input) {
        personReview {
          id
          ...DominantCharacteristicsCircularIndicator_review
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

export default function StrengthsWeaknessesPage() {
  const { enqueueSnackbar } = useBiDiSnackbar();
  const strengthsWeaknessesPageMutation = useStrengthsWeaknessesPageMutation();
  const { id: revieweeId } = useAuthGuardUser();
  const data = useLazyLoadQuery<StrengthsWeaknessesPageQuery>(query, { id: revieweeId });
  const review = data.viewer.findPersonReview;

  const handleSubmit = useCallback(
    (data: StrengthsWeaknessesFormData) => {
      const transformedData = transformData(data);

      const input = { input: { revieweeId, ...transformedData } };
      strengthsWeaknessesPageMutation(input)
        .then(res => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch(error => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [strengthsWeaknessesPageMutation, revieweeId, enqueueSnackbar],
  );

  return (
    <Box padding={4}>
      <PromptProvider message={i18n._('Changes you made may not be saved.')}>
        <StrengthsWeaknessesForm
          onSubmit={handleSubmit}
          initialValue={{
            strengths: normalizeArray(review?.strengths),
            weaknesses: normalizeArray(review?.weaknesses),
          }}
        />
      </PromptProvider>
    </Box>
  );
}

export interface StrengthsWeaknessesFormData {
  strengths?: string[];
  weaknesses?: string[];
}
