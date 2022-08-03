import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import clsx from 'clsx';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

export interface ReviewAvatar {
  avatarUrl?: string;
  name?: string;
  self?: boolean;
}

interface OwnProps {
  users: ReadonlyArray<ReviewAvatar>;
}

type Props = FCProps<OwnProps> & StyleProps;

export function ReviewAvatarGroup(props: Props) {
  const { users } = props;
  const classes = useStyles(props);

  return (
    <AvatarGroup max={3} classes={{ root: classes.root, avatar: classes.avatars }}>
      {users.map((user, index) => (
        <Avatar
          alt={user.name}
          key={index}
          src={user.avatarUrl ?? undefined}
          classes={{
            root: clsx(classes.avatar, { [classes.self]: user.self }),
            colorDefault: classes.colorDefault,
          }}
        />
      ))}
    </AvatarGroup>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '@media print': {
        display: 'none !important',
      },
    },
    avatars: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
    avatar: {
      // Only apply white background to none fallback avatars
      '&:not($colorDefault)': {
        background: theme.palette.common.white,
      },
    },
    colorDefault: {},
    self: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: theme.palette.primary.light,
    },
  });

const useStyles = makeStyles(styles, { name: 'ReviewAvatarGroup' });
type StyleProps = Styles<typeof styles>;
