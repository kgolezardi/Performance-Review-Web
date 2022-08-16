import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ActionBar } from 'src/shared/action-bar';
import { Box, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
import {
  ConstantInput,
  DictInput,
  DictInputItem,
  Forminator,
  FragmentPrompt,
  SubmitButton,
} from 'src/shared/forminator';
import { Question } from 'src/shared/DynamicFields';
import { Rating } from 'src/shared/rating';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { transformAnswersToFormData } from 'src/shared/utils/transformAnswers';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { ManageReviewFormData } from './ManagerReviewAchievementsValue';
import { ManagerReviewEvaluationBox } from '../ManagerReviewEvaluationBox';
import { ManagerReviewForm_data$key } from './__generated__/ManagerReviewForm_data.graphql';

const fragment = graphql`
  fragment ManagerReviewForm_data on ManagerProjectCommentNode {
    answers {
      questionId
      value
    }
    rating
    projectReview {
      id
      projectName
      reviewee {
        ...getUserLabel_user
      }
    }
  }
`;

interface OwnProps {
  formData: ManagerReviewForm_data$key | null;
  onSubmit: (formData: ManageReviewFormData) => void;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ManagerReviewForm(props: Props) {
  const { onSubmit } = props;

  const classes = useStyles(props);
  const formData = useFragment(fragment, props.formData);
  const { managerReviewProjectQuestions } = useRoundQuestions();
  const dirty = useFormDirty();

  if (formData === null) {
    return null;
  }

  const {
    answers,
    projectReview: { id, projectName, reviewee },
    rating,
  } = formData;

  const transformedFormData: ManageReviewFormData = {
    projectReviewId: id,
    rating,
    answers: transformAnswersToFormData(answers, managerReviewProjectQuestions),
  };

  return (
    <Forminator initialValue={transformedFormData} onSubmit={onSubmit}>
      <Box bgcolor="grey.100" borderRadius={2} px={2}>
        <Grid container spacing={3}>
          <DictInput>
            <DictInputItem field="projectReviewId">
              <ConstantInput />
            </DictInputItem>
            <Grid item xs={12}>
              <DictInputItem field="rating">
                <ManagerReviewEvaluationBox
                  text={i18n._('Your evaluation of {name} on project {projectName}', {
                    name: getUserLabel(reviewee),
                    projectName,
                  })}
                >
                  <Rating inputLabel={i18n._('Evaluation')} type="peer" />
                  <FragmentPrompt value={rating} />
                </ManagerReviewEvaluationBox>
              </DictInputItem>
            </Grid>
            {managerReviewProjectQuestions.map((question) => (
              <Grid key={question.id} item xs={12}>
                <Question
                  classes={{
                    root: classes.inputRoot,
                  }}
                  question={question}
                  formData={transformedFormData}
                />
              </Grid>
            ))}
          </DictInput>
          <Grid item xs={12}>
            <ActionBar>
              <SubmitButton variant="contained" color="primary" disabled={!dirty}>
                {i18n._('Save')}
              </SubmitButton>
            </ActionBar>
          </Grid>
        </Grid>
      </Box>
    </Forminator>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    inputRoot: {
      backgroundColor: 'white',
    },
  });

const useStyles = makeStyles(styles, { name: 'ManagerReviewForm' });
