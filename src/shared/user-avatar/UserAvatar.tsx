import { Avatar, AvatarProps } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { UserAvatar_user$key } from './__generated__/UserAvatar_user.graphql';

interface OwnProps extends AvatarProps {
  user: UserAvatar_user$key;
}

type Props = FCProps<OwnProps>;
const fragment = graphql`
  fragment UserAvatar_user on UserNode {
    avatarUrl
    firstName
    lastName
    username
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
