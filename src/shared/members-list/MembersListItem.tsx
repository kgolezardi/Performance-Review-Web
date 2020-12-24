import PersonIcon from '@material-ui/icons/Person';
import React, { useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { ListItem, ListItemIcon, ListItemText, Theme, createStyles, lighten, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  id: string | null;
  label: React.ReactNode;
  onChange: (id: string | null) => void;
  selected?: boolean;
}

type Props = FCProps<OwnProps> & StyleProps;

export function MembersListItem(props: Props) {
  const classes = useStyles(props);
  const { id, onChange, selected, label } = props;

  const handleClick = useCallback(() => {
    onChange(id);
  }, [onChange, id]);

  return (
    <ListItem
      button
      onClick={handleClick}
      selected={selected}
      classes={{
        root: classes.root,
        selected: classes.selected,
      }}
    >
      <ListItemIcon classes={{ root: classes.itemIconRoot }}>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          classes: {
            body1: classes.typographyBody1,
          },
        }}
      />
    </ListItem>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    selected: {},
    itemIconRoot: {},
    typographyBody1: {},
    root: {
      borderBottom: '1px solid',
      borderBottomColor: theme.palette.divider,
      paddingBottom: theme.spacing(1) + 1,
      '&$selected': {
        backgroundColor: lighten(theme.palette.primary.main, 0.85),
        borderBottomWidth: 2,
        borderBottomColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        paddingBottom: theme.spacing(1),
      },
      '&$selected:hover': {
        backgroundColor: lighten(theme.palette.primary.main, 0.85),
      },
      '&$selected $itemIconRoot': {
        color: theme.palette.primary.main,
      },
      '&$selected $typographyBody1': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'MemberListItem' });
type StyleProps = Styles<typeof styles>;
