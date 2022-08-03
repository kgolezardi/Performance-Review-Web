import { i18n } from '@lingui/core';
import { Box } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useAppSettings } from 'src/core/settings';
import { useMutation } from 'src/relay';
import { DominantCharacteristicsOutput } from 'src/shared/dominant-characteristics-output';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { StrengthsWeaknessesForm } from './StrengthsWeaknessesForm';
import { normalizeArray } from './utils';
import { StrengthsWeaknessesPageMutation } from './__generated__/StrengthsWeaknessesPageMutation.graphql';
import { StrengthsWeaknessesPageQuery } from './__generated__/StrengthsWeaknessesPageQuery.graphql';

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
          state
          ...DominantCharacteristicsCircularIndicator_review
        }
      }
    }
  `);

const query = graphql`
  query StrengthsWeaknessesPageQuery($id: ID!) {
    viewer {
      user(id: $id) {
        selfPersonReview {
          ...DominantCharacteristicsOutput_review
          state
          strengths
          weaknesses
          isSelfReview
        }
        peerPersonReview {
          ...DominantCharacteristicsOutput_review
          state
          strengths
          weaknesses
          isSelfReview
        }
      }
    }
  }
`;

const transformData = (data: StrengthsWeaknessesFormData) => {
  const strengths = data.strengths?.filter((val) => !!val);
  const weaknesses = data.weaknesses?.filter((val) => !!val);

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
  const { phase } = useAppSettings();

  const review = phase === 'PEER_REVIEW' ? data.viewer.user?.peerPersonReview : data.viewer.user?.selfPersonReview;

  const handleSubmit = useCallback(
    (data: StrengthsWeaknessesFormData) => {
      const transformedData = transformData(data);

      const input = { input: { revieweeId, ...transformedData } };
      strengthsWeaknessesPageMutation(input)
        .then((res) => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch((error) => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [strengthsWeaknessesPageMutation, revieweeId, enqueueSnackbar],
  );

  return (
    <Box padding={4}>
      {review?.state === 'DONE' ? (
        <DominantCharacteristicsOutput review={review} />
      ) : (
        <StrengthsWeaknessesForm
          onSubmit={handleSubmit}
          initialValue={{
            strengths: normalizeArray(review?.strengths),
            weaknesses: normalizeArray(review?.weaknesses),
          }}
          isSelfReview={review?.isSelfReview || false}
        />
      )}
    </Box>
  );
}

export interface StrengthsWeaknessesFormData {
  strengths?: string[];
  weaknesses?: string[];
}
