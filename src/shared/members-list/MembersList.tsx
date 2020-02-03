import { List } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useState } from 'react';
import { useFragment } from 'react-relay/hooks';
import { FCProps } from 'src/shared/types/FCProps';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { MembersList_user$key } from './__generated__/MembersList_user.graphql';
import { MembersListItem } from './MembersListItem';

interface OwnProps {
  members: MembersList_user$key;
  onClick: (id: string | null) => void;
}

type Props = FCProps<OwnProps>;

export function MembersList(props: Props) {
  const { onClick } = props;

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const members = useFragment(fragment, props.members);

  const handleClick = useCallback(
    (id: string | null) => {
      onClick(id);
      setSelectedUserId(id);
    },
    [onClick],
  );

  return (
    <List component="nav">
      {members.map(member => (
        <MembersListItem
          key={member.id}
          id={member.id}
          label={getUserLabel(member)}
          onClick={handleClick}
          selected={member.id === selectedUserId}
        />
      ))}
    </List>
  );
}

const fragment = graphql`
  fragment MembersList_user on UserNode @relay(plural: true) {
    id
    username
    firstName
    lastName
  }
`;
