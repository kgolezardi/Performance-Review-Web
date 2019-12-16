import { OutlinedTextFieldProps, TextField } from '@material-ui/core';
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
  textFieldOptions?: OutlinedTextFieldProps;
  renderInput?: AutocompleteProps['renderInput'];
  excludes?: string[]; // ids // TODO rethink about this prop
}
type Props<Suggestion extends BaseSuggestion = BaseSuggestion> = FCProps<OwnProps<Suggestion>> &
  Omit<AutocompleteProps, 'value' | 'onChange' | 'defaultValue' | 'renderInput' | 'multiple'>;

function SelectMultiAutoComplete<Suggestion extends BaseSuggestion = BaseSuggestion>({
  initialValue = [],
  options: allOptions,
  label,
  textFieldOptions,
  excludes,
  ...props
}: Props<Suggestion>) {
  const [values, setValues] = useForminatorState<string[], string[]>(initialValue);

  const options = useMemo(() => {
    const excludesSet = new Set(excludes || []);
    return allOptions.filter(o => !excludesSet.has(o.value));
  }, [allOptions, excludes]);
  const indexedOptions = useMemo(() => indexBy<Suggestion>(prop('value'), options), [options]);
  const onChange = useCallback(
    (event, newValue: Suggestion[]) => {
      setValues(map(prop('value'), newValue));
    },
    [setValues],
  );
  const renderInput: AutocompleteProps['renderInput'] = useCallback(
    params => <TextField variant="outlined" label={label} fullWidth {...textFieldOptions} {...params} />,
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
