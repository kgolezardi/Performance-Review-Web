import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useContext, useState } from 'react';
import { Box, Button, Paper, Popper } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { LanguageCodes } from 'src/core/locales/types';
import { LocationState } from 'src/pages/peer-review-board-page/PeerReviewBoardPage';
import { MDXContext } from '@mdx-js/react';
import { MDXPropsProvider } from 'src/shared/mdx-provider/MDXPropsProvider';
import { PersonInfoCardHeader } from 'src/shared/person-info-card-header';
import { TextButton } from 'src/shared/text-button';
import { UserType } from 'src/shared/utils/getUserLabel';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { importMDX } from 'mdx.macro';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFormDirty } from 'src/shared/form-change-detector';
import { useFragment } from 'react-relay/hooks';
import { useHistory } from 'react-router-dom';

import { PeerReviewPersonInfoCard_user$key } from './__generated__/PeerReviewPersonInfoCard_user.graphql';
import { useSavePersonReviewMutation } from './savePersonReview.mutation';

const DoneButtonHelpContent = importMDX.sync('./DoneButtonHelpContent.mdx');

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

type Props = FCProps<OwnProps>;

export function PeerReviewPersonInfoCard(props: Props) {
  const user = useFragment<PeerReviewPersonInfoCard_user$key>(fragment, props.user);
  const savePersonReviewMutation = useSavePersonReviewMutation();
  const { enqueueSnackbar } = useBiDiSnackbar();
  const history = useHistory<LocationState>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const components = useContext(MDXContext);

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
  const dirty = useFormDirty();
  const allProjectCommentsFilled = user.projectReviews.every(({ comment }) => !!(comment?.text && comment?.rating));
  const disabled = !dirty || !allProjectCommentsFilled;

  const handleHelperTextClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);

  return (
    <PersonInfoCardHeader
      action={
        state === 'DONE' ? (
          <Button onClick={handleEditClick} variant="outlined" color="default">
            {i18n._('Edit')}
          </Button>
        ) : (
          <Box display="flex" flexDirection="column">
            <Button color="secondary" disabled={disabled} onClick={handleEndEvaluationClick} variant="contained">
              {i18n._("End {name}'s evaluation", { name })}
            </Button>
            {disabled && (
              <Box marginTop={1}>
                <TextButton color="primary" onClick={handleHelperTextClick}>
                  {i18n._('When does this button activates?')}
                </TextButton>
                <Popper open={open} anchorEl={anchorEl} style={{ zIndex: 2000 }} placement="bottom-end">
                  <Paper>
                    <Box width="400px" padding={2}>
                      <MDXPropsProvider<UserType | null> value={user}>
                        <DoneButtonHelpContent components={components} />
                      </MDXPropsProvider>
                      <Box marginTop={2} display="flex" justifyContent="flex-end">
                        <TextButton color="primary" onClick={handleHelperTextClick}>
                          {i18n._('I got it')}
                        </TextButton>
                      </Box>
                    </Box>
                  </Paper>
                </Popper>
              </Box>
            )}
          </Box>
        )
      }
      subheader={i18n._('He/She asked your review on {numberOfProjects} project(s)', {
        numberOfProjects,
      })}
      user={user}
    />
  );
}
