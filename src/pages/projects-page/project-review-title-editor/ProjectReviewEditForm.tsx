import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Box, Button, DialogActions, DialogContent, Theme, createStyles, makeStyles } from '@material-ui/core';
import { DictInput, DictInputItem, Forminator, StringInput, SubmitButton } from 'src/shared/forminator';
import { i18n } from '@lingui/core';
import { map, prop } from 'ramda';
import { transformAnswersToInput } from 'src/shared/utils/transformAnswers';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFragment } from 'react-relay/hooks';
import { useRoundQuestions } from 'src/core/round-questions';

import { AddProjectFormData } from '../AddProjectForm';
import { EditProjectReviewMutationInput } from '../__generated__/editProjectReviewMutation.graphql';
import { ProjectReviewEditForm_projectReview$key } from './__generated__/ProjectReviewEditForm_projectReview.graphql';
import { useEditProjectReview } from '../editProjectReview.mutation';

interface OwnProps {
  projectReview: ProjectReviewEditForm_projectReview$key;
  onCloseModal?: () => void;
}

type Props = React.PropsWithChildren<OwnProps>;

export function ProjectReviewEditForm(props: Props) {
  const { onCloseModal, projectReview } = props;

  const classes = useStyles();

  const project = useFragment(
    graphql`
      fragment ProjectReviewEditForm_projectReview on ProjectReviewNode {
        projectName
        id
        rating
        reviewers {
          id
        }
        answers {
          questionId
          value
        }
      }
    `,
    projectReview,
  );

  const { enqueueSnackbar } = useBiDiSnackbar();
  const { selfReviewProjectQuestions } = useRoundQuestions();
  const editProjectReview = useEditProjectReview();

  const handleEditProjectReviewTitle = ({ projectName }: AddProjectFormData) => {
    const input: EditProjectReviewMutationInput = {
      projectReviewId: project.id,
      answers: transformAnswersToInput(project.answers, selfReviewProjectQuestions),
      rating: project.rating,
      reviewersId: map(prop('id'), project.reviewers),
      projectName,
    };
    return editProjectReview({ input })
      .then((res) => {
        if (!res.editProjectReview.projectReview) {
          enqueueSnackbar(`${i18n._('Something went wrong.')} ${i18n._('The project review name already exists.')}`, {
            variant: 'error',
          });
          return;
        }
        enqueueSnackbar(i18n._('Successfully saved.'), { variant: 'success' });
        onCloseModal?.();
      })
      .catch((e) => {
        enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
      });
  };

  return (
    <Forminator onSubmit={handleEditProjectReviewTitle}>
      <DialogContent>
        <DictInput>
          <DictInputItem field="projectName">
            <StringInput
              variant="outlined"
              fullWidth
              initialValue={project.projectName}
              label={i18n._('Project title')}
            />
          </DictInputItem>
        </DictInput>
      </DialogContent>
      <DialogActions>
        <Box p={2} display="flex" alignItems="center">
          <Box mr={1}>
            <Button className={classes.button} size="large" onClick={onCloseModal}>
              {i18n._('Cancel')}
            </Button>
          </Box>
          <SubmitButton className={classes.button} size="large" variant="contained" color="primary" type="submit">
            {i18n._('Submit changes')}
          </SubmitButton>
        </Box>
      </DialogActions>
    </Forminator>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    button: {
      minWidth: 96,
    },
  });
const useStyles = makeStyles(styles, { name: 'ProjectReviewEditForm' });
