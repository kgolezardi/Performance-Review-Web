import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { Button } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { LanguageCodes } from 'src/core/locales/types';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { i18n } from '@lingui/core';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFragment } from 'react-relay/hooks';

import { EndEvaluation } from './EndEvaluation';
import { PeerReviewPersonInfoCard_user$key } from './__generated__/PeerReviewPersonInfoCard_user.graphql';
import { useSavePersonReviewMutation } from './savePersonReview.mutation';

const fragment = graphql`
  fragment PeerReviewPersonInfoCard_user on UserNode {
    id
    ...PersonInfoCardHeader_user
    ...EndEvaluation_user
    peerPersonReview {
      state
    }
    projectReviews {
      id
    }
  }
`;

interface OwnProps {
  user: PeerReviewPersonInfoCard_user$key;
}

type Props = FCProps<OwnProps>;

export function PeerReviewPersonInfoCard(props: Props) {
  const user = useFragment(fragment, props.user);
  const savePersonReviewMutation = useSavePersonReviewMutation();
  const { enqueueSnackbar } = useBiDiSnackbar();

  const state = user.peerPersonReview?.state;

  const handleEditClick = useCallback(() => {
    savePersonReviewMutation({ input: { revieweeId: user.id, state: 'DOING' } }).catch(() => {
      enqueueSnackbar(i18n._('An error occurred. Try again!'), { variant: 'error' });
    });
  }, [user, savePersonReviewMutation, enqueueSnackbar]);

  const numberOfProjects = localizeNumber(user.projectReviews.length, i18n.language as LanguageCodes);

  return (
    <PersonInfoCardHeader
      action={
        state === 'DONE' ? (
          <Button onClick={handleEditClick} variant="outlined" color="default">
            {i18n._('Edit')}
          </Button>
        ) : (
          <EndEvaluation user={user} />
        )
      }
      subheader={i18n._('He/She asked your review on {numberOfProjects} project(s)', {
        numberOfProjects,
      })}
      user={user}
    />
  );
}
