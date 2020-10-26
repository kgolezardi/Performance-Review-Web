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
    <AvatarGroup max={3} classes={{ root: classes.root, avatar: classes.avatar }}>
      {users.map((user, index) => (
        <Avatar
          alt={user.name}
          key={index}
          src={user.avatarUrl ?? undefined}
          className={clsx({ [classes.self]: user.self })}
        />
      ))}
    </AvatarGroup>
  );
}

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  } as CSSProperties,
  self: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.light,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'ReviewAvatarGroup' });
type StyleProps = Styles<typeof styles>;
