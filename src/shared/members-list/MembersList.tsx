import graphql from 'babel-plugin-relay/macro';
import React, { unstable_useTransition as useTransition, useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { List } from '@material-ui/core';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useFragment } from 'react-relay/hooks';

import { MembersListItem } from './MembersListItem';
import { MembersList_user$key } from './__generated__/MembersList_user.graphql';
import { useMemberListContext } from './MemberListContext';

const fragment = graphql`
  fragment MembersList_user on UserNode @relay(plural: true) {
    id
    ...getUserLabel_user
  }
`;

interface OwnProps {
  members: MembersList_user$key;
  onClick?: (id: string | null) => void;
}

type Props = FCProps<OwnProps>;

export function MembersList(props: Props) {
  const { onClick } = props;
  const members = useFragment(fragment, props.members);
  const { userId, setUserId } = useMemberListContext();
  const [startTransition] = useTransition();

  const handleClick = useCallback(
    (id: string | null) => {
      onClick && onClick(id);
      startTransition(() => {
        setUserId(id);
      });
    },
    [setUserId, onClick, startTransition],
  );

  return (
    <List component="nav">
      {members.map((member) => (
        <MembersListItem
          key={member.id}
          id={member.id}
          label={getUserLabel(member)}
          onChange={handleClick}
          selected={member.id === userId}
        />
      ))}
    </List>
  );
}
