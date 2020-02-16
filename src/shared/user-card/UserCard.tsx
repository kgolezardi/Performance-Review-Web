import React from 'react';
import { makeStyles, Theme, Grid, Typography, Paper } from '@material-ui/core';
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
    <Paper className={classes.root} elevation={3}>
      <Grid container spacing={2}>
        <Grid xs={4} className={classes.imageWrapper} item>
          <div className={classes.image}>
            <img alt={userFullName} className={classes.profilePicture} src={profilePicture} />
          </div>
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
    width: '100%',
  } as CSSProperties,
  imageWrapper: {
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
  } as CSSProperties,
  image: {
    width: '80px',
    height: '80px',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '50%',
    marginLeft: theme.spacing(2),
  } as CSSProperties,
  profilePicture: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    objectFit: 'contain',
    width: '100%',
    height: '100%',
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
