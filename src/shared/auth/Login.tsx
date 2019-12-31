import { i18n } from '@lingui/core';
import { Card, Container } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/styles';
import React, { useState } from 'react';
import sahabLogo from 'src/assets/sahab-logo.png';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { useLoginMutation } from './login.mutation';
import LoginForm, { LoginFormProps } from './LoginForm';

interface OwnProps {}

type Props = FCProps<OwnProps> & StyleProps;

export function Login(props: Props) {
  const classes = useStyles();
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
  return (
    <>
      <div className={classes.background} />
      <div className={classes.fullPageContainer}>
        <Container component="main" maxWidth="xs" className={classes.formContainer}>
          <div className={classes.logoWrapper}>
            <img src={sahabLogo} alt={i18n._('Sahab')} />
          </div>
          <Card className={classes.paper}>
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
    padding: 20,
    borderRadius: theme.spacing(1),
  } as CSSProperties,
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(2),
  } as CSSProperties,
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    margin: 0,
  },
  fullPageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  formContainer: { zIndex: 1 },
  background: {
    position: 'absolute',
    height: '100%',
    width: '100vw',
    background: theme.palette.primary.dark,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Login' });
type StyleProps = Styles<typeof styles>;
