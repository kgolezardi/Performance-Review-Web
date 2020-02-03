import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { MembersListItem_user$key } from './__generated__/MembersListItem_user.graphql';
import { Person as PersonIcon } from '@material-ui/icons';
import { getUserLabel } from 'src/shared/utils/getUserLabel';

interface OwnProps {
  member: MembersListItem_user$key;
}

type Props = FCProps<OwnProps>;

export function MembersListItem(props: Props) {
  const member = useFragment(fragment, props.member);
  const [activeId, setActiveId] = useState(null);
  const onClick = useCallback(id => {
    setActiveId(id);
  }, []);

  return (
    <ListItem button onClick={() => onClick(member.id)} selected={activeId === member.id}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={getUserLabel(member)} />
    </ListItem>
  );
}

const fragment = graphql`
  fragment MembersListItem_user on UserNode {
    id
    username
    firstName
    lastName
  }
`;
