import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Avatar, AvatarProps } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useFragment } from 'react-relay/hooks';

import { UserAvatar_user$key } from './__generated__/UserAvatar_user.graphql';

interface OwnProps extends AvatarProps {
  user: UserAvatar_user$key;
}

type Props = FCProps<OwnProps>;
const fragment = graphql`
  fragment UserAvatar_user on UserNode {
    avatarUrl
    ...getUserLabel_user
  }
`;

export function UserAvatar(props: Props) {
  const { user: userProp, ...rest } = props;
  const user = useFragment(fragment, props.user);
  const name = getUserLabel(user);
  return (
    <Avatar {...rest} alt={name} src={user.avatarUrl || undefined}>
      {name[0] || null}
    </Avatar>
  );
}
