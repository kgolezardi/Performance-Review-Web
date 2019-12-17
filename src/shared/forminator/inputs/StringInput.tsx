import { Omit, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import React, { useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useForminatorState } from '../core/useForminatorState';

interface OwnProps {
  initialValue: string;
}

type Props = FCProps<OwnProps> & Omit<TextFieldProps, 'value' | 'onChange' | 'defaultValue'>;

function StringInput({ initialValue, ...props }: Props) {
  const [value, setValue] = useForminatorState(initialValue);
  const onChange = useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return <TextField {...props} value={value} onChange={onChange} />;
}
StringInput.defaultProps = { initialValue: '' };
export default StringInput;
