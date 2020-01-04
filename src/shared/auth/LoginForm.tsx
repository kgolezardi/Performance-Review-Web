import { i18n } from '@lingui/core';
import { Button, makeStyles, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { DictInput, DictInputItem, Form, Forminator, StringInput } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

export interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void> | void;
  error: string | null;
}

type Props = FCProps<LoginFormProps> & StyleProps;

export const LoginForm = (props: Props) => {
  const classes = useStyles(props);
  return (
    <Forminator onSubmit={props.onSubmit}>
      <Form>
        <DictInput>
          <DictInputItem field="username">
            <StringInput
              className={classes.stringInput}
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
              variant="outlined"
              margin="dense"
              label={i18n._('Username')}
              fullWidth
              error={Boolean(props.error)}
            />
          </DictInputItem>
          <DictInputItem field="password">
            <StringInput
              className={classes.stringInput}
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
              type="password"
              variant="outlined"
              margin="dense"
              label={i18n._('Password')}
              fullWidth
              error={Boolean(props.error)}
              helperText={props.error || NON_BREAKING_SPACE}
            />
          </DictInputItem>
        </DictInput>
        <br /> {/* TODO: PLEASE FIX THIS */}
        <Button variant="contained" fullWidth type="submit" color="primary" size="large">
          {i18n._('Login to user panel')}
        </Button>
      </Form>
    </Forminator>
  );
};

const styles = (theme: Theme) => ({
  input: {
    padding: theme.spacing(2, 1.5),
  } as CSSProperties,
  stringInput: {
    marginBottom: theme.spacing(4),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'LoginForm' });
type StyleProps = Styles<typeof styles>;
