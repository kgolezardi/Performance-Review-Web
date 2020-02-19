import { i18n } from '@lingui/core';
import { Box } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { StrengthsWeaknessesPageQuery } from 'src/pages/strengths-weaknesses-page/__generated__/StrengthsWeaknessesPageQuery.graphql';
import { useMutation } from 'src/relay';
import { PromptProvider } from 'src/shared/prompt';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessesForm } from './StrengthsWeaknessesForm';
import { normalizeArray } from './utils';
import { StrengthsWeaknessesPageMutation } from './__generated__/StrengthsWeaknessesPageMutation.graphql';

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

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
        reviewee {
          ...StrengthsWeaknessesForm_user
        }
        strengths
        weaknesses
        isSelfReview
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

export default function StrengthsWeaknessesPage(props: Props) {
  const { revieweeId } = props;
  const { enqueueSnackbar } = useBiDiSnackbar();
  const strengthsWeaknessesPageMutation = useStrengthsWeaknessesPageMutation();
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
    <Box padding={3} paddingTop={4}>
      <PromptProvider message={i18n._('Changes you made may not be saved.')}>
        <StrengthsWeaknessesForm
          user={review?.reviewee ?? null}
          onSubmit={handleSubmit}
          initialValue={{
            strengths: normalizeArray(review?.strengths),
            weaknesses: normalizeArray(review?.weaknesses),
          }}
          isSelfReview={review?.isSelfReview || false}
        />
      </PromptProvider>
    </Box>
  );
}

export interface StrengthsWeaknessesFormData {
  strengths?: string[];
  weaknesses?: string[];
}
