import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Person as PersonIcon } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';

interface OwnProps {
  id: string | null;
  label: React.ReactNode;
  onClick: (id: string | null) => void;
  selected?: boolean;
}

type Props = FCProps<OwnProps>;

export function MembersListItem(props: Props) {
  const { id, onClick, selected, label } = props;

  const handleClick = useCallback(() => {
    onClick(id);
  }, [onClick, id]);

  return (
    <ListItem button onClick={handleClick} selected={selected}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  );
}
