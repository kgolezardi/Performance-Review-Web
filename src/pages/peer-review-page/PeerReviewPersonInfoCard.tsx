import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { Button, Divider, Theme, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { LanguageCodes } from 'src/core/locales/types';
import { LocationState } from 'src/pages/peer-review-board-page/PeerReviewBoardPage';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { Styles } from 'src/shared/types/Styles';
import { TopStickyCard } from 'src/shared/top-sticky-card';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFragment } from 'react-relay/hooks';
import { useHistory } from 'react-router-dom';
import { usePromptStateContext } from 'src/shared/prompt/PromptProvider';

import { PeerReviewPersonInfoCard_user$key } from './__generated__/PeerReviewPersonInfoCard_user.graphql';
import { useSavePersonReviewMutation } from './savePersonReview.mutation';

const fragment = graphql`
  fragment PeerReviewPersonInfoCard_user on UserNode {
    id
    ...getUserLabel_user
    ...PersonInfoCardHeader_user
    personReview {
      state
    }
    projectReviews {
      comment {
        text
        rating
      }
    }
  }
`;

interface OwnProps {
  user: PeerReviewPersonInfoCard_user$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function PeerReviewPersonInfoCard(props: Props) {
  const { children } = props;
  const classes = useStyles(props);

  const user = useFragment<PeerReviewPersonInfoCard_user$key>(fragment, props.user);
  const savePersonReviewMutation = useSavePersonReviewMutation();
  const { enqueueSnackbar } = useBiDiSnackbar();
  const history = useHistory<LocationState>();

  const state = user.personReview?.state;
  const name = getUserLabel(user, { short: true });

  const handleEndEvaluationClick = useCallback(() => {
    savePersonReviewMutation({ input: { revieweeId: user.id, state: 'DONE' } })
      .then((data) => {
        enqueueSnackbar(i18n._("{name}'s evaluation completed successfully.", { name }), {
          variant: 'success',
        });
        // check if all reviews assigned to the reviewee are in the state of 'DONE'
        const usersState = data.savePersonReview.viewer.usersToReview.map((user) => user.personReview?.state);
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
  const { changed } = usePromptStateContext();
  const allProjectCommentFilled = !user.projectReviews.every(
    ({ comment }) => !!(comment && comment.text && comment.rating),
  );
  const disabled = changed || allProjectCommentFilled;

  return (
    <TopStickyCard classes={{ root: classes.root }}>
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
      <Divider />
      {children}
    </TopStickyCard>
  );
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PeerReviewPersonInfoCard' });
type StyleProps = Styles<typeof styles>;
