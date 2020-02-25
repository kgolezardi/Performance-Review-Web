import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import React, { useCallback } from 'react';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { IconButton, Theme, Typography, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { getUserLabel } from 'src/shared/utils/getUserLabel';
import { useAuthGuardUser } from 'src/core/auth';

import { useLogoutMutation } from './logout.mutation';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function NavbarUser(props: Props) {
  const classes = useStyles(props);

  const logoutMutation = useLogoutMutation();

  const handleLogout = useCallback(() => {
    return logoutMutation({ input: {} });
  }, [logoutMutation]);

  const user = useAuthGuardUser();

  return (
    <div className={classes.root}>
      <Typography variant="body2" className={classes.label}>
        {getUserLabel(user)}
      </Typography>
      <IconButton onClick={handleLogout} color="inherit">
        <LogoutIcon />
      </IconButton>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  } as CSSProperties,
  label: {
    marginRight: theme.spacing(),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'NavbarUser' });
type StyleProps = Styles<typeof styles>;
