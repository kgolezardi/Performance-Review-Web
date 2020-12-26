import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { BehavioralCompetenciesOutput } from 'src/shared/behavioral-competencies-output';
import { Box } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';

import { BehavioralCompetenciesForm } from './BehavioralCompetenciesForm';
import { BehavioralCompetenciesFormValue } from './BehavioralCompetenciesFormValue';
import { BehavioralCompetenciesPageMutation } from './__generated__/BehavioralCompetenciesPageMutation.graphql';
import { BehavioralCompetenciesPageQuery } from './__generated__/BehavioralCompetenciesPageQuery.graphql';

interface OwnProps {
  revieweeId: string;
}

type Props = FCProps<OwnProps>;

const useBehavioralCompetenciesPageMutation = () =>
  useMutation<BehavioralCompetenciesPageMutation>(graphql`
    mutation BehavioralCompetenciesPageMutation($input: SavePersonReviewMutationInput!) {
      savePersonReview(input: $input) {
        personReview {
          id
          state
          ...BehavioralCompetenciesCircularIndicator_review
          ...DominantCharacteristicsCircularIndicator_review
        }
      }
    }
  `);

const query = graphql`
  query BehavioralCompetenciesPageQuery($id: ID!) {
    viewer {
      review: findPersonReview(revieweeId: $id) {
        reviewee {
          id
          ...getUserLabel_user
        }
        ...BehavioralCompetenciesOutput_review
        ...BehavioralCompetenciesForm_review
        isSelfReview
        state
      }
    }
  }
`;

export default function BehavioralCompetenciesPage(props: Props) {
  const { revieweeId } = props;
  const { enqueueSnackbar } = useBiDiSnackbar();
  const BehavioralCompetenciesPageMutation = useBehavioralCompetenciesPageMutation();

  const data = useLazyLoadQuery<BehavioralCompetenciesPageQuery>(query, { id: revieweeId });

  const handleSubmit = useCallback(
    (data: BehavioralCompetenciesFormValue) => {
      const input = { input: { revieweeId, ...data } };
      BehavioralCompetenciesPageMutation(input)
        .then(() => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch(() => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [BehavioralCompetenciesPageMutation, revieweeId, enqueueSnackbar],
  );

  const review = data.viewer.review;
  // const user = review?.reviewee;
  const isSelfReview = review?.isSelfReview || false;
  const readonly = review?.state === 'DONE';

  return (
    <Box padding={4}>
      {readonly ? (
        <BehavioralCompetenciesOutput review={review} isSelfReview={isSelfReview} />
      ) : (
        <BehavioralCompetenciesForm review={data.viewer.review} onSubmit={handleSubmit} isSelfReview={isSelfReview} />
      )}
    </Box>
  );
}
