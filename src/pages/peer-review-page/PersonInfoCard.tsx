import { i18n } from '@lingui/core';
import { Avatar, Button, Card, CardContent, CardHeader, Divider, makeStyles, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, { Fragment, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { useFragment } from 'react-relay/hooks';
import { LanguageCodes } from 'src/core/locales/types';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { localizeNumber } from 'src/shared/utils/localizeNumber.util';
import { useFinalSubmitMutation } from './finalSubmit.mutation';
import { PersonInfoCard_user$key } from './__generated__/PersonInfoCard_user.graphql';

const fragment = graphql`
  fragment PersonInfoCard_user on UserNode {
    id
    username
    firstName
    lastName
    projectReviews {
      comments {
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

  const [ref, inView] = useInView();

  const user = useFragment<PersonInfoCard_user$key>(fragment, props.user);

  const finalSubmitMutation = useFinalSubmitMutation();

  const handleSubmit = useCallback(() => {
    finalSubmitMutation({ input: { revieweeId: user.id, state: 'DONE' } });
  }, [user, finalSubmitMutation]);

  const numberOfProjects = localizeNumber(user.projectReviews.length, i18n.language as LanguageCodes);

  const disabled = !user.projectReviews.every(({ comments }) => {
    if (!comments.length) {
      return false;
    }
    return comments.map(comment => !!(comment?.text && comment?.rating));
  });

  return (
    <Fragment>
      {/* TODO: extract inView component */}
      <div className={classes.inViewSpy} ref={ref} />
      <Card classes={{ root: classes.root }}>
        <CardHeader
          title={getUserLabel(user)}
          subheader={i18n._('He/She asked your review on {numberOfProjects} project(s)', {
            numberOfProjects,
          })}
          action={
            <Button onClick={handleSubmit} variant="contained" color="secondary" disabled={disabled}>
              {i18n._('Done')}
            </Button>
          }
          avatar={
            <Avatar
              // TODO: show random color
              className={clsx(classes.avatar, { [classes.avatarShrink]: !inView })}
              // TODO: get avatar from server
              // src={avatar}
            >
              {user.firstName[0]}
            </Avatar>
          }
          titleTypographyProps={{ variant: 'h5', gutterBottom: true }}
          classes={{ root: classes.headerRoot, action: classes.action }}
        />
        <Divider variant="middle" />
        <CardContent classes={{ root: classes.content }}>{children}</CardContent>
      </Card>
    </Fragment>
  );
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
  headerRoot: {
    padding: theme.spacing(3, 6),
  } as CSSProperties,
  avatar: {
    backgroundColor: red[500],
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
  inViewSpy: {
    height: 1,
    width: '100%',
    backgroundColor: 'transparent',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'PersonInfoCard' });
type StyleProps = Styles<typeof styles>;
