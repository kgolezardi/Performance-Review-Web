import { i18n } from '@lingui/core';
import { Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useFragment } from 'react-relay/hooks';
import { Link } from 'react-router-dom';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { UserAvatar } from 'src/shared/user-avatar';
import { escape } from 'src/shared/utils/base64.util';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { UserCard_user$key } from './__generated__/UserCard_user.graphql';

export interface UserCardProps {
  user: UserCard_user$key;
}

type Props = FCProps<UserCardProps> & StyleProps;

const fragment = graphql`
  fragment UserCard_user on UserNode {
    id
    ...getUserLabel_user
    ...UserAvatar_user
    projectReviews {
      id
    }
  }
`;

export const UserCard = (props: Props) => {
  const classes = useStyles(props);
  const user = useFragment(fragment, props.user);

  const userId = user.id;
  const escapeUid = useMemo(() => escape(userId), [userId]);

  return (
    <Paper className={classes.root}>
      <Link to={`/peer-review/${escapeUid}`} className={classes.link}>
        <Grid container spacing={2}>
          <Grid xs={4} className={classes.imageWrapper} item>
            <UserAvatar user={user} className={classes.profilePicture} />
          </Grid>
          <Grid xs={8} item container>
            <Grid className={classes.textSection} item xs container direction="column">
              <Grid className={classes.textWrapper} item xs>
                <Typography gutterBottom variant="h6">
                  {getUserLabel(user)}
                </Typography>
                <Typography variant="body2" className={classes.textSecondary}>
                  {i18n._('Requested for {count} project(s) to review.', { count: user.projectReviews.length })}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Link>
    </Paper>
  );
};

const styles = (theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
  } as CSSProperties,
  imageWrapper: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  } as CSSProperties,
  profilePicture: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft: theme.spacing(2),
  } as CSSProperties,
  textSection: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(),
  } as CSSProperties,
  textWrapper: {
    padding: theme.spacing(2),
    marginLeft: -theme.spacing(2),
  } as CSSProperties,
  textSecondary: {
    color: theme.palette.grey[600],
  } as CSSProperties,
  link: {
    textDecoration: 'none',
    color: 'unset',
  } as CSSProperties,
});
const useStyles = makeStyles(styles, { name: 'UserCard' });
type StyleProps = Styles<typeof styles>;
