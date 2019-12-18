import { OutlinedTextFieldProps, TextField } from '@material-ui/core';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { indexBy, prop } from 'ramda';
import React, { useCallback, useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useForminatorState } from '../core/useForminatorState';

interface BaseSuggestion {
  value: string;
  label: string;
}

interface OwnProps<Suggestion extends BaseSuggestion = BaseSuggestion> {
  initialValue?: string | null; // id
  options: Array<Suggestion>;
  label: string;
  textFieldOptions?: OutlinedTextFieldProps;
  renderInput?: AutocompleteProps['renderInput'];
  excludes?: string[];
}
type Props<Suggestion extends BaseSuggestion = BaseSuggestion> = FCProps<OwnProps<Suggestion>> &
  Omit<AutocompleteProps, 'value' | 'onChange' | 'defaultValue' | 'renderInput' | 'multiple'>;

function SelectAutoComplete<Suggestion extends BaseSuggestion = BaseSuggestion>({
  initialValue = null,
  options: allOptions,
  label,
  textFieldOptions,
  excludes,
  ...props
}: Props<Suggestion>) {
  const [value, setValue] = useForminatorState<string | null, string | null>(initialValue);
  const onChange = useCallback(
    (event, newValue: Suggestion | null) => {
      setValue(newValue === null ? null : newValue.value);
    },
    [setValue],
  );
  const options = useMemo(() => {
    const excludesSet = new Set(excludes || []);
    return allOptions.filter(o => !excludesSet.has(o.value));
  }, [allOptions, excludes]);
  const indexedOptions = useMemo(() => indexBy<Suggestion>(prop('value'), options), [options]);
  const renderInput: AutocompleteProps['renderInput'] = useCallback(
    params => <TextField margin="dense" variant="outlined" label={label} fullWidth {...textFieldOptions} {...params} />,
    [textFieldOptions, label],
  );
  return (
    <Autocomplete
      getOptionLabel={option => option.label}
      renderInput={renderInput}
      {...props}
      options={options}
      value={value === null ? null : indexedOptions[value]}
      onChange={onChange}
    />
  );
}
export default SelectAutoComplete;
