import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

export interface ReviewAvatar {
  avatarUrl?: string;
  name?: string;
}

interface OwnProps {
  users: ReadonlyArray<ReviewAvatar>;
}

type Props = FCProps<OwnProps>;

export function ReviewAvatarGroup(props: Props) {
  const { users } = props;

  return (
    <AvatarGroup max={3}>
      {users.map((user, index) => (
        <Avatar alt={user.name} key={index} src={user.avatarUrl ?? undefined} />
      ))}
    </AvatarGroup>
  );
}
