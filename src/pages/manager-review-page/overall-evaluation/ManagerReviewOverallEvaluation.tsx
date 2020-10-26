import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  SubmitButton,
} from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { Rating } from 'src/shared/rating';
import { ServerValueProvider } from 'src/shared/server-value';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';

import { ManagerReviewOverallEvaluationMutation } from './__generated__/ManagerReviewOverallEvaluationMutation.graphql';
import { ManagerReviewOverallEvaluationQuery } from './__generated__/ManagerReviewOverallEvaluationQuery.graphql';
import { ManagerReviewOverallEvaluationValue } from './ManagerReviewOverallEvaluationValue';

const query = graphql`
  query ManagerReviewOverallEvaluationQuery($id: ID!) {
    viewer {
      user(id: $id) {
        managerPersonReview {
          overallRating
        }
      }
    }
  }
`;

interface OwnProps {
  revieweeId: string;
}
type Props = FCProps<OwnProps>;

export default function ManagerReviewOverallEvaluation(props: Props) {
  const { revieweeId } = props;

  const data = useLazyLoadQuery<ManagerReviewOverallEvaluationQuery>(query, { id: revieweeId });

  const savePersonReview = useMutation<ManagerReviewOverallEvaluationMutation>(graphql`
    mutation ManagerReviewOverallEvaluationMutation($input: SaveManagerPersonReviewMutationInput!) {
      saveManagerPersonReview(input: $input) {
        managerPersonReview {
          overallRating
        }
      }
    }
  `);

  const { enqueueSnackbar } = useBiDiSnackbar();

  const overallRating = data.viewer.user?.managerPersonReview?.overallRating ?? undefined;

  const value: ManagerReviewOverallEvaluationValue = {
    revieweeId,
    overallRating,
  };

  const handleSubmit = (data: ManagerReviewOverallEvaluationValue) => {
    savePersonReview({ input: data })
      .then(() => {
        enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
      });
  };
  return (
    <Box paddingY={12} paddingX={20}>
      <ServerValueProvider value={value}>
        <Forminator onSubmit={handleSubmit} initialValue={value}>
          {/* TODO: Add overall evaluation text */}
          <Typography gutterBottom />
          <DictInput>
            <DictInputItem field="revieweeId">
              <ConstantInput />
            </DictInputItem>
            <Grid container spacing={3}>
              <Grid item xs>
                <DictInputItem field="overallRating">
                  <Box height="42px" clone>
                    <Rating fullWidth inputLabel={i18n._('Evaluation')} type="peer" margin="none" />
                  </Box>
                  <FragmentPrompt value={overallRating ?? null} />
                </DictInputItem>
              </Grid>
              <Grid item>
                <Box alignItems="center" display="flex" height="100%" marginTop="1px">
                  <SubmitButton color="primary" size="large" variant="contained">
                    {i18n._('Save')}
                  </SubmitButton>
                </Box>
              </Grid>
            </Grid>
          </DictInput>
        </Forminator>
      </ServerValueProvider>
    </Box>
  );
}
