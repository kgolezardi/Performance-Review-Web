import ReactMarkdown from 'react-markdown';
import graphql from 'babel-plugin-relay/macro';
import React, { Fragment } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import {
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  SubmitButton,
} from 'src/shared/forminator';
import { EvaluationOutput } from 'src/shared/evaluation-output';
import { FCProps } from 'src/shared/types/FCProps';
import { Rating } from 'src/shared/rating';
import { ServerValueProvider } from 'src/shared/server-value';
import { defaultRenderers } from 'src/shared/react-markdown';
import { i18n } from '@lingui/core';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useMutation } from 'src/relay';

import { ManagerReviewOverallEvaluationQuery } from './__generated__/ManagerReviewOverallEvaluationQuery.graphql';
import { ManagerReviewOverallEvaluationValue } from './ManagerReviewOverallEvaluationValue';
import { managerReviewPersonMutation } from '../managerReviewPersonMutation';

const query = graphql`
  query ManagerReviewOverallEvaluationQuery($id: ID!) {
    viewer {
      user(id: $id) {
        managerPersonReview {
          overallRating
        }
        ranking1
        ranking2
      }
      settings {
        managerOverallReviewText
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
  const saveManagerPersonReview = useMutation(managerReviewPersonMutation);

  const dirty = useFormDirty();
  const { enqueueSnackbar } = useBiDiSnackbar();
  // TODO:
  if (!data.viewer.user) {
    return null;
  }

  const overallReviewText = (data.viewer.settings.managerOverallReviewText ?? '')
    .replace(/{{ ranking1 }}/, data.viewer.user.ranking1 ?? i18n._('Unknown'))
    .replace(/{{ ranking2 }}/, data.viewer.user.ranking2 ?? i18n._('Unknown'));

  const overallRating = data.viewer.user.managerPersonReview?.overallRating ?? undefined;

  const value: ManagerReviewOverallEvaluationValue = {
    revieweeId,
    overallRating,
  };

  const handleSubmit = (data: ManagerReviewOverallEvaluationValue) => {
    saveManagerPersonReview({ input: data })
      .then(() => {
        enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
      })
      .catch(() => {
        enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
      });
  };

  return (
    <Fragment>
      <Box paddingY={12} paddingX={20} displayPrint="none !important">
        <ServerValueProvider value={value}>
          <Forminator onSubmit={handleSubmit} initialValue={value}>
            <ReactMarkdown renderers={defaultRenderers}>{overallReviewText}</ReactMarkdown>
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
                    <SubmitButton color="primary" size="large" variant="contained" disabled={!dirty}>
                      {i18n._('Save')}
                    </SubmitButton>
                  </Box>
                </Grid>
              </Grid>
            </DictInput>
          </Forminator>
        </ServerValueProvider>
      </Box>
      <Box display="none">
        <EvaluationOutput type="peer" value={overallRating ?? null} />
      </Box>
    </Fragment>
  );
}
