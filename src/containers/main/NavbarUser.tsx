import { IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import { NavbarUserMutation } from 'src/containers/main/__generated__/NavbarUserMutation.graphql';
import { useAuthGuardUser } from 'src/core/auth';
import { useMutation } from 'src/relay';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

const useNavbarUserMutation = () =>
  useMutation<NavbarUserMutation>(graphql`
    mutation NavbarUserMutation($input: LogoutMutationInput!) {
      logout(input: $input) {
        viewer {
          me {
            id
          }
        }
      }
    }
  `);

export function NavbarUser(props: Props) {
  const classes = useStyles(props);

  const navbarUserMutation = useNavbarUserMutation();

  const handleLogout = useCallback(
    () =>
      navbarUserMutation({ input: {} })
        .then(res => {})
        .catch(error => {}),
    [navbarUserMutation],
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
