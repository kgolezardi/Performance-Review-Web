import { i18n } from '@lingui/core';
import React from 'react';
import { Forminator, StringInput } from 'src/shared/forminator';
import DictInput from 'src/shared/forminator/inputs/dict-input/DictInput';
import DictInputItem from 'src/shared/forminator/inputs/dict-input/DictInputItem';
import SubmitButton from 'src/shared/forminator/utils/SubmitButton';

export interface LoginFormProps {
  onSubmit: (data: { username: string; password: string }) => Promise<void> | void;
  error: string | null;
}

export default function LoginForm(props: LoginFormProps) {
  return (
    <Forminator onSubmit={props.onSubmit}>
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
            helperText={props.error}
          />
        </DictInputItem>
      </DictInput>
      <br /> {/* TODO: PLEASE FIX THIS */}
      <SubmitButton variant="contained" fullWidth>
        {i18n._('Submit')}
      </SubmitButton>
    </Forminator>
  );
}
