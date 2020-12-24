import React from 'react';
import { Box, Button, Theme, createStyles, makeStyles } from '@material-ui/core';
import { DictInput, DictInputItem, Form, Forminator, StringInput } from 'src/shared/forminator';
import { FCProps } from 'src/shared/types/FCProps';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';

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
              variant="outlined"
              autoComplete="username"
              margin="dense"
              label={i18n._('Username')}
              fullWidth
              error={Boolean(props.error)}
            />
          </DictInputItem>
          <DictInputItem field="password">
            <StringInput
              className={classes.stringInput}
              type="password"
              autoComplete="current-password"
              variant="outlined"
              margin="dense"
              label={i18n._('Password')}
              fullWidth
              error={Boolean(props.error)}
              helperText={props.error || NON_BREAKING_SPACE}
            />
          </DictInputItem>
        </DictInput>
        <Box marginTop={2}>
          <Button variant="contained" fullWidth type="submit" color="primary" size="large">
            {i18n._('Login')}
          </Button>
        </Box>
      </Form>
    </Forminator>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    stringInput: {},
  });

const useStyles = makeStyles(styles, { name: 'LoginForm' });
type StyleProps = Styles<typeof styles>;
