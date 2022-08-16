import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import clsx from 'clsx';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, Tooltip, createStyles, makeStyles } from '@material-ui/core';

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
    <AvatarGroup max={11} classes={{ root: classes.root, avatar: classes.avatars }}>
      {users.map((user, index) => (
        <Tooltip key={index} title={user.name}>
          <Avatar
            alt={user.name}
            src={user.avatarUrl}
            classes={{
              root: clsx(classes.avatar, { [classes.self]: user.self }),
              colorDefault: classes.colorDefault,
            }}
          />
        </Tooltip>
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
