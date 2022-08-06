import * as React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { ActionBar } from 'src/shared/action-bar';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { ElementType } from 'src/shared/types/ElementType';
import { RoundQuestions_peerReview } from 'src/core/round-questions/__generated__/RoundQuestions_peerReview.graphql';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { innerJoin, prop } from 'ramda';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useDialog } from 'src/shared/hooks';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';
import { useHistory } from 'react-router-dom';
import { useRoundQuestions } from 'src/core/round-questions';

import { AchievementsContent } from './EndEvaluationDialogContent/AchievementsContent';
import { BoldTypography } from './EndEvaluationDialogContent/BoldTypography';
import { DominantCharacteristicsContent } from './EndEvaluationDialogContent/DominantCharacteristicsContent';
import { EndEvaluation_user, EndEvaluation_user$key } from './__generated__/EndEvaluation_user.graphql';
import { LocationState } from '../peer-review-board-page/PeerReviewBoardPage';
import { useSavePersonReviewMutation } from './savePersonReview.mutation';

const fragment = graphql`
  fragment EndEvaluation_user on UserNode {
    id
    ...getUserLabel_user
    projectReviews {
      comment {
        projectReview {
          projectName
        }
        rating
        answers {
          value
          questionId
        }
      }
    }
    peerPersonReview {
      weaknesses
      strengths
    }
  }
`;

interface OwnProps {
  user: EndEvaluation_user$key;
}

type Props = React.PropsWithChildren<OwnProps>;

export function EndEvaluation(props: Props) {
  const { peerReviewProjectQuestions } = useRoundQuestions();

  const user = useFragment(fragment, props.user);

  const { id, peerPersonReview, projectReviews } = user;

  const { open, toggle } = useDialog(false);
  const dirty = useFormDirty();
  const history = useHistory<LocationState>();
  const { enqueueSnackbar } = useBiDiSnackbar();
  const name = getUserLabel(user, { short: true });

  const savePersonReviewMutation = useSavePersonReviewMutation();

  const handleDonePersonReview = React.useCallback(async () => {
    try {
      const data = await savePersonReviewMutation({ input: { revieweeId: id, state: 'DONE' } });
      enqueueSnackbar(i18n._("{name}'s evaluation completed successfully.", { name }), {
        variant: 'success',
      });
      const usersState = data.savePersonReview.viewer.usersToReview.map((user) => user.peerPersonReview?.state);
      const showDialog = usersState.every((state) => state === 'DONE');
      history.push('/peer-review', { showDialog });
    } catch (error) {
      enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
    }
  }, [savePersonReviewMutation, id, enqueueSnackbar, name, history]);

  const projectStates = projectReviews
    .map<[string, number]>((project) => [
      project.comment?.projectReview.projectName ?? '',
      getValue(project, peerReviewProjectQuestions),
    ])
    .filter(([_, percentage]) => percentage < 100);

  const existStrengths = !!peerPersonReview?.strengths?.length;
  const existWeaknesses = !!peerPersonReview?.weaknesses?.length;

  const handleDoneClick = () => {
    if (projectStates.length > 0 || !existWeaknesses || !existStrengths) {
      toggle(true);
      return;
    }

    return handleDonePersonReview();
  };

  return (
    <>
      <Button onClick={handleDoneClick} variant="contained" color="secondary" disabled={dirty}>
        {i18n._("End {name}'s evaluation", { name })}
      </Button>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => toggle(false)}>
        <DialogTitle>{i18n._('The parts that are not complete')}</DialogTitle>
        <DialogContent dividers>
          <AchievementsContent projectStates={projectStates} />
          <Box mt={projectStates.length > 0 ? 2 : 0}>
            <DominantCharacteristicsContent existWeaknesses={existWeaknesses} existStrengths={existStrengths} />
          </Box>
          <Box mt={4}>
            <BoldTypography>{i18n._('Are you sure you want to end the {name} evaluation?', { name })}</BoldTypography>
          </Box>
        </DialogContent>
        <DialogActions>
          <ActionBar>
            <Button onClick={() => toggle(false)}>{i18n._('No')}</Button>
            <Button variant="contained" color="primary" onClick={handleDonePersonReview}>
              {i18n._('Yes')}
            </Button>
          </ActionBar>
        </DialogActions>
      </Dialog>
    </>
  );
}

const getValue = (
  project: ElementType<EndEvaluation_user['projectReviews']>,
  questions: RoundQuestions_peerReview,
): number => {
  const { comment } = project;
  const roundAnswers = innerJoin((a, b) => a.questionId === b.id, comment?.answers ?? [], questions);
  const hasFilledRating = Boolean(comment?.rating);
  const filledText = roundAnswers.filter(prop('value'));

  return ((2 * Number(hasFilledRating) + 8 * (filledText.length / questions.length)) / 10) * 100;
};
