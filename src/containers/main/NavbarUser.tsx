import { IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import React, { useCallback } from 'react';
import { useLogoutMutation } from 'src/containers/main/logout.mutation';
import { useAuthGuardUser } from 'src/core/auth';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function NavbarUser(props: Props) {
  const classes = useStyles(props);

  const logoutMutation = useLogoutMutation();

  const handleLogout = useCallback(
    () =>
      logoutMutation({ input: {} })
        .then(res => {})
        .catch(error => {}),
    [logoutMutation],
  );

  const { username } = useAuthGuardUser();

  return (
    <div className={classes.root}>
      <Typography className={classes.username}>{username}</Typography>
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
  username: {
    marginRight: theme.spacing(),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'NavbarUser' });
type StyleProps = Styles<typeof styles>;
