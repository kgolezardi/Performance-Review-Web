import { i18n } from '@lingui/core';
import { Button, Card, CardContent, CardHeader, Divider, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useFragment } from 'react-relay/hooks';
import { useHistory } from 'react-router-dom';
import { LanguageCodes } from 'src/core/locales/types';
import { useInViewContext } from 'src/shared/in-view';
import { useBiDiSnackbar } from 'src/shared/snackbar';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { UserAvatar } from 'src/shared/user-avatar';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';
import { useFinalSubmitMutation } from './finalSubmit.mutation';
import { PersonInfoCard_user$key } from './__generated__/PersonInfoCard_user.graphql';

const fragment = graphql`
  fragment PersonInfoCard_user on UserNode {
    id
    ...getUserLabel_user
    ...UserAvatar_user
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

  const finalSubmitMutation = useFinalSubmitMutation();
  const { enqueueSnackbar } = useBiDiSnackbar();
  const history = useHistory();

  const handleSubmit = useCallback(() => {
    finalSubmitMutation({ input: { revieweeId: user.id, state: 'DONE' } })
      .then(() => {
        enqueueSnackbar(
          i18n._("{name}'s evaluation has been ended successfully.", { name: getUserLabel(user, { short: true }) }),
          {
            variant: 'success',
          },
        );
        history.push('/peer-review');
      })
      .catch(() => {
        enqueueSnackbar(i18n._('An error occurred.Try again!'), { variant: 'error' });
      });
  }, [user, finalSubmitMutation, history, enqueueSnackbar]);

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
          <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={disabled}>
            {i18n._("End {name}'s evaluation", { name: getUserLabel(user, { short: true }) })}
          </Button>
        }
        avatar={<UserAvatar user={user} className={clsx(classes.avatar, { [classes.avatarShrink]: !topInView })} />}
        titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
        classes={{ root: classes.headerRoot, action: classes.action }}
      />
      <Divider variant="middle" />
      <CardContent classes={{ root: classes.content }}>{children}</CardContent>
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
