import { i18n } from '@lingui/core';
import { Card, Container, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { useState } from 'react';
import defaultLoginBackgroundImage from 'src/assets/login-background.png';
import logo from 'src/assets/logo-light.png';
import { useAppSettings } from 'src/core/settings';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { useLoginMutation } from './login.mutation';
import { LoginForm, LoginFormProps } from './LoginForm';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function Login(props: Props) {
  const classes = useStyles();
  const settings = useAppSettings();
  const [error, setError] = useState<string | null>(null);
  // TODO: set submit loading button
  // const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const loginMutation = useLoginMutation();

  const submitHandler: LoginFormProps['onSubmit'] = data => {
    // setSubmitButtonLoading(true);
    const input = { input: { username: data.username, password: data.password } };
    loginMutation(input).then(res => {
      if (!res.login.viewer.me) {
        setError(i18n._('Username or Password is incorrect.'));
        // setSubmitButtonLoading(false);
      }
    });
  };

  const loginBackgroundImage = settings.loginBackgroundImage || defaultLoginBackgroundImage;

  return (
    <>
      <div className={classes.background} style={{ backgroundImage: `url(${loginBackgroundImage})` }} />
      <div className={classes.fullPageContainer}>
        <Container component="main" maxWidth="xs" className={classes.formContainer}>
          <Card className={classes.paper}>
            <img src={logo} alt={'logo'} className={classes.logo} />
            <Typography variant="h5" color="primary" className={classes.logoSubtitle}>
              {i18n._('Performance Review System')}
            </Typography>
            <LoginForm onSubmit={submitHandler} error={error} />
          </Card>
        </Container>
      </div>
    </>
  );
}

const styles = (theme: Theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8.5),
    borderRadius: theme.spacing(1),
  } as CSSProperties,
  logo: {
    width: '100%',
    margin: -theme.spacing(6),
    minHeight: 0,
  } as CSSProperties,
  logoSubtitle: {
    marginBottom: theme.spacing(6),
  } as CSSProperties,
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  } as CSSProperties,
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  } as CSSProperties,
  textField: {
    margin: 0,
  } as CSSProperties,
  fullPageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  } as CSSProperties,
  formContainer: {
    zIndex: 1,
  } as CSSProperties,
  background: {
    position: 'absolute',
    height: '100%',
    width: '100vw',
    backgroundColor: theme.palette.primary.dark,
    backgroundSize: 'cover',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Login' });
type StyleProps = Styles<typeof styles>;
