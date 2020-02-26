import clsx from 'clsx';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { Button, Card, CardHeader, Divider, Theme, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { LanguageCodes } from 'src/core/locales/types';
import { Styles } from 'src/shared/types/Styles';
import { UserAvatar } from 'src/shared/user-avatar';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { i18n } from '@lingui/core';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { useFragment } from 'react-relay/hooks';
import { useHistory } from 'react-router-dom';
import { useInViewContext } from 'src/shared/in-view';

import { PersonInfoCard_user$key } from './__generated__/PersonInfoCard_user.graphql';
import { useSavePersonReviewMutation } from './savePersonReview.mutation';

const fragment = graphql`
  fragment PersonInfoCard_user on UserNode {
    id
    ...getUserLabel_user
    ...UserAvatar_user
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
  user: PersonInfoCard_user$key;
}

type Props = FCProps<OwnProps> & StyleProps;

export function PersonInfoCard(props: Props) {
  const { children } = props;
  const classes = useStyles(props);
  const { topInView } = useInViewContext();
  const user = useFragment<PersonInfoCard_user$key>(fragment, props.user);
  const savePersonReviewMutation = useSavePersonReviewMutation();
  const { enqueueSnackbar } = useBiDiSnackbar();
  const history = useHistory();

  const state = user.personReview?.state;
  const name = getUserLabel(user, { short: true });

  const handleEndEvaluationClick = useCallback(() => {
    savePersonReviewMutation({ input: { revieweeId: user.id, state: 'DONE' } })
      .then(() => {
        enqueueSnackbar(i18n._("{name}'s evaluation completed successfully.", { name }), {
          variant: 'success',
        });
        history.push('/peer-review');
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
  const disabled = !user.projectReviews.every(({ comment }) => !!(comment && comment.text && comment.rating));

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader
        title={getUserLabel(user)}
        subheader={i18n._('He/She asked your review on {numberOfProjects} project(s)', {
          numberOfProjects,
        })}
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
        avatar={<UserAvatar user={user} className={clsx(classes.avatar, { [classes.avatarShrink]: !topInView })} />}
        titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
        classes={{ root: classes.headerRoot, action: classes.action }}
      />
      <Divider />
      {children}
    </Card>
  );
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
  headerRoot: {
    padding: theme.spacing(3, 6),
  } as CSSProperties,
  avatar: {
    width: 80,
    height: 80,
    transition: theme.transitions.create(['width', 'height']),
  } as CSSProperties,
  avatarShrink: {
    width: 48,
    height: 48,
  } as CSSProperties,
  action: {
    margin: 0,
    alignSelf: 'center',
  } as CSSProperties,
  content: {
    padding: theme.spacing(),
    '&:last-child': {
      padding: theme.spacing(),
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PersonInfoCard' });
type StyleProps = Styles<typeof styles>;
