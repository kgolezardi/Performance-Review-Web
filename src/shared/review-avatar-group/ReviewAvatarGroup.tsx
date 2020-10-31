import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import clsx from 'clsx';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, makeStyles } from '@material-ui/core';

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

const styles = (theme: Theme) => ({
  root: {
    '@media print': {
      display: 'none !important',
    },
  } as CSSProperties,
  avatars: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  } as CSSProperties,
  avatar: {
    // Only apply white background to none fallback avatars
    '&:not($colorDefault)': {
      background: theme.palette.common.white,
    },
  } as CSSProperties,
  colorDefault: {} as CSSProperties,
  self: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ReviewAvatarGroup' });
type StyleProps = Styles<typeof styles>;
