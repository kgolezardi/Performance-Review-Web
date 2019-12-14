import { TextField, TextFieldProps } from '@material-ui/core';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { indexBy, map, prop } from 'ramda';
import React, { useCallback, useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useForminatorState } from '../core/useForminatorState';

interface BaseSuggestion {
  value: string;
  label: string;
}

interface OwnProps<Suggestion extends BaseSuggestion = BaseSuggestion> {
  initialValue?: string[]; // id
  options: Array<Suggestion>;
  label: string;
  textFieldOptions?: TextFieldProps;
  renderInput?: AutocompleteProps['renderInput'];
}
type Props<Suggestion extends BaseSuggestion = BaseSuggestion> = FCProps<OwnProps<Suggestion>> &
  Omit<AutocompleteProps, 'value' | 'onChange' | 'defaultValue' | 'renderInput' | 'multiple'>;

function SelectMultiAutoComplete<Suggestion extends BaseSuggestion = BaseSuggestion>({
  initialValue = [],
  options,
  label,
  textFieldOptions,
  ...props
}: Props<Suggestion>) {
  const [values, setValues] = useForminatorState<string[], string[]>(initialValue);

  const indexedOptions = useMemo(() => indexBy<Suggestion>(prop('value'), options), [options]);
  const onChange = useCallback(
    (event, newValue: Suggestion[]) => {
      setValues(map(prop('value'), newValue));
    },
    [setValues],
  );
  const renderInput: AutocompleteProps['renderInput'] = useCallback(
    params => <TextField label={label} fullWidth {...textFieldOptions} {...params} />,
    [textFieldOptions, label],
  );

  return (
    <Autocomplete
      getOptionLabel={option => option.label}
      renderInput={renderInput}
      {...props}
      multiple
      options={options}
      value={values.map(v => indexedOptions[v])}
      onChange={onChange}
    />
  );
}
export default SelectMultiAutoComplete;
