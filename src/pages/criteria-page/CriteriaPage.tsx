import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { CriteriaOutput } from 'src/shared/criteria-output';
import { FCProps } from 'src/shared/types/FCProps';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { UserType } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';

import { CriteriaForm } from './CriteriaForm';
import { CriteriaFormValue } from './CriteriaFormValue';
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
          ...getUserLabel_user
        }
        ...CriteriaOutput_review
        ...CriteriaForm_review
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
    (data: CriteriaFormValue) => {
      const input = { input: { revieweeId, ...data } };
      criteriaPageMutation(input)
        .then(() => {
          enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        })
        .catch(() => {
          enqueueSnackbar(i18n._('Something went wrong.'), { variant: 'error' });
        });
    },
    [criteriaPageMutation, revieweeId, enqueueSnackbar],
  );

  const review = data.viewer.review;
  const user = review?.reviewee;
  const isSelfReview = review?.isSelfReview || false;

  return (
    <Box padding={4}>
      {review?.state === 'DONE' ? (
        <CriteriaOutput review={review} isSelfReview={isSelfReview} />
      ) : (
        <MDXPropsProvider<UserType | null> value={user || null}>
          <CriteriaForm review={data.viewer.review} onSubmit={handleSubmit} isSelfReview={isSelfReview} />
        </MDXPropsProvider>
      )}
    </Box>
  );
}
