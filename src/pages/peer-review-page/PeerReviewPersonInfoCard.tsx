import { i18n } from '@lingui/core';
import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import { innerJoin, prop } from 'ramda';
import React, { useCallback } from 'react';
import { useFragment } from 'react-relay/hooks';
import { useHistory } from 'react-router-dom';
import { Answers } from 'src/core/domain';
import { LanguageCodes } from 'src/core/locales/types';
import { useRoundQuestions } from 'src/core/round-questions';
import { LocationState } from 'src/pages/peer-review-board-page/PeerReviewBoardPage';
import { useFormDirty } from 'src/shared/form-change-detector';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';
import { useSavePersonReviewMutation } from './savePersonReview.mutation';
import { PeerReviewPersonInfoCard_user$key } from './__generated__/PeerReviewPersonInfoCard_user.graphql';

const fragment = graphql`
  fragment PeerReviewPersonInfoCard_user on UserNode {
    id
    ...getUserLabel_user
    ...PersonInfoCardHeader_user
    peerPersonReview {
      state
    }
    projectReviews {
      comment {
        rating
        answers {
          value
          questionId
        }
      }
    }
  }
`;

interface OwnProps {
  user: PeerReviewPersonInfoCard_user$key;
}

type Props = FCProps<OwnProps>;

export function PeerReviewPersonInfoCard(props: Props) {
  const user = useFragment<PeerReviewPersonInfoCard_user$key>(fragment, props.user);
  const savePersonReviewMutation = useSavePersonReviewMutation();
  const { enqueueSnackbar } = useBiDiSnackbar();
  const { peerReviewProjectQuestions } = useRoundQuestions();

  const history = useHistory<LocationState>();

  const state = user.peerPersonReview?.state;
  const name = getUserLabel(user, { short: true });

  const handleEndEvaluationClick = useCallback(() => {
    savePersonReviewMutation({ input: { revieweeId: user.id, state: 'DONE' } })
      .then((data) => {
        enqueueSnackbar(i18n._("{name}'s evaluation completed successfully.", { name }), {
          variant: 'success',
        });
        // check if all reviews assigned to the reviewee are in the state of 'DONE'
        const usersState = data.savePersonReview.viewer.usersToReview.map((user) => user.peerPersonReview?.state);
        const showDialog = usersState.every((state) => state === 'DONE');
        history.push('/peer-review', { showDialog });
      })
      .catch(() => {
        enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
      });
  }, [user, savePersonReviewMutation, history, enqueueSnackbar, name]);

  const handleEditClick = useCallback(() => {
    savePersonReviewMutation({ input: { revieweeId: user.id, state: 'DOING' } }).catch(() => {
      enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
    });
  }, [user, savePersonReviewMutation, enqueueSnackbar]);

  const numberOfProjects = localizeNumber(user.projectReviews.length, i18n.language as LanguageCodes);
  const dirty = useFormDirty();
  const peerAnswers = (answers: Answers) =>
    innerJoin((a, b) => a.questionId === b.id, answers, peerReviewProjectQuestions);

  const allProjectCommentFilled = user.projectReviews.every(
    ({ comment }) => !!(comment && peerAnswers(comment.answers).every(prop('value')) && comment.rating),
  );
  const disabled = dirty || !allProjectCommentFilled;

  return (
    <PersonInfoCardHeader
      action={
        state === 'DONE' ? (
          <Button onClick={handleEditClick} variant="outlined" color="default">
            {i18n._('Edit')}
          </Button>
        ) : (
          <Button onClick={handleEndEvaluationClick} variant="contained" color="secondary" disabled={disabled}>
            {i18n._("End {name}'s evaluation", { name })}
          </Button>
        )
      }
      subheader={i18n._('He/She asked your review on {numberOfProjects} project(s)', {
        numberOfProjects,
      })}
      user={user}
    />
  );
}
