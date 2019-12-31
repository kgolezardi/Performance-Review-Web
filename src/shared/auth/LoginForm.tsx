import { i18n } from '@lingui/core';
import { Button } from '@material-ui/core';
import React from 'react';
import { DictInput, DictInputItem, Form, Forminator, StringInput } from 'src/shared/forminator';
import { NON_BREAKING_SPACE } from 'src/shared/constants';

export interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void> | void;
  error: string | null;
}

export default function LoginForm(props: LoginFormProps) {
  return (
    <Forminator onSubmit={props.onSubmit}>
      <Form>
        <DictInput>
          <DictInputItem field="username">
            <StringInput
              variant="outlined"
              margin="dense"
              label={i18n._('Username')}
              fullWidth
              error={Boolean(props.error)}
            />
          </DictInputItem>
          <DictInputItem field="password">
            <StringInput
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
        <Button variant="contained" fullWidth type="submit">
          {i18n._('Login')}
        </Button>
      </Form>
    </Forminator>
  );
}
