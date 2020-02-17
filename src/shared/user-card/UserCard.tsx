import React from 'react';
import { makeStyles, Theme, Grid, Typography, Paper, Avatar } from '@material-ui/core';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import avatarPlaceholder from 'src/assets/avatar-placeholder.png';
export interface UserCardProps {
  profilePicture?: string;
  userFullName: string;
  description: string;
}
type Props = FCProps<UserCardProps> & StyleProps;
export const UserCard = (props: Props) => {
  const { profilePicture = avatarPlaceholder, userFullName, description } = props;
  const classes = useStyles(props);
  return (
    <Paper className={classes.root}>
      <Grid container spacing={2}>
        <Grid xs={4} className={classes.imageWrapper} item>
          <Avatar alt={userFullName} src={profilePicture} className={classes.profilePicture} />
        </Grid>
        <Grid xs={8} item container>
          <Grid className={classes.textSection} item xs container direction="column">
            <Grid className={classes.textWrapper} item xs>
              <Typography gutterBottom variant="h6">
                {userFullName}
              </Typography>
              <Typography variant="body2" className={classes.textSecondary}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const styles = (theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
  } as CSSProperties,
  imageWrapper: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  } as CSSProperties,
  profilePicture: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft: theme.spacing(2),
  } as CSSProperties,
  textSection: {
    marginBottom: theme.spacing(),
    marginTop: theme.spacing(),
  } as CSSProperties,
  textWrapper: {
    padding: theme.spacing(2),
    marginLeft: -theme.spacing(2),
  } as CSSProperties,
  textSecondary: {
    color: theme.palette.grey[600],
  } as CSSProperties,
});
const useStyles = makeStyles(styles, { name: 'UserCard' });
type StyleProps = Styles<typeof styles>;
