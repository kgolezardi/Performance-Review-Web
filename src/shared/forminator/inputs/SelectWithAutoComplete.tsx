import React, { useCallback } from 'react';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { useForminatorState } from '../core/useForminatorState';
import { FCProps } from 'src/shared/types/FCProps';

interface Suggestion {
  title: string;
}

interface OwnProps {
  initialValue: Suggestion;
  options: Array<Suggestion>;
  label: string;
  textFieldOptions?: Object;
}
type Props = FCProps<OwnProps> &
  Omit<AutocompleteProps, 'value' | 'onChange' | 'defaultValue' | 'renderInput' | 'getOptionLabel'>;

function SelectWithAutoComplete({ initialValue, options, label, textFieldOptions, ...props }: Props) {
  const [value, setValue] = useForminatorState(initialValue);
  const onChange = useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return (
    <Autocomplete
      {...props}
      options={options}
      getOptionLabel={option => option.title}
      defaultValue={value}
      onChange={onChange}
      renderInput={params => <TextField {...params} label={label} {...textFieldOptions} fullWidth />}
    />
  );
}
SelectWithAutoComplete.defaultProps = { initialValue: { title: '' } as Suggestion };
export default SelectWithAutoComplete;
