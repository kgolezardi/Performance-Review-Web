import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import React, { ComponentType, useCallback, useMemo } from 'react';
import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete/Autocomplete';
import { FCProps } from 'src/shared/types/FCProps';
import { OutlinedTextFieldProps, Paper, TextField, Theme, createStyles, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';
import { indexBy, prop } from 'ramda';
import { withProps } from 'src/shared/utils/withProps';

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
  renderInput?: AutocompleteProps<Suggestion>['renderInput'];
  excludes?: string[];
}
type Props<Suggestion extends BaseSuggestion = BaseSuggestion> = FCProps<OwnProps<Suggestion>> &
  Omit<AutocompleteProps<Suggestion>, 'value' | 'onChange' | 'defaultValue' | 'renderInput' | 'multiple'> &
  StyleProps;

const OptionsPaper: ComponentType = withProps(Paper, { elevation: 4 }) as any;

function SelectAutoComplete<Suggestion extends BaseSuggestion = BaseSuggestion>({
  initialValue = null,
  options: allOptions,
  label,
  textFieldOptions,
  excludes,
  ...props
}: Props<Suggestion>) {
  const classes = useStyles(props);

  const [value, setValue] = useForminatorState<string | null, string | null>(initialValue);
  const onChange = useCallback(
    (event, newValue: Suggestion | null) => {
      setValue(newValue === null ? null : newValue.value);
    },
    [setValue],
  );
  const options = useMemo(() => {
    const excludesSet = new Set(excludes || []);
    return allOptions.filter((o) => !excludesSet.has(o.value));
  }, [allOptions, excludes]);
  const indexedOptions = useMemo(() => indexBy<Suggestion>(prop('value'), options), [options]);
  const renderInput: AutocompleteProps<Suggestion>['renderInput'] = useCallback(
    (params) => (
      <TextField margin="dense" variant="outlined" label={label} fullWidth {...textFieldOptions} {...params} />
    ),
    [textFieldOptions, label],
  );
  return (
    <Autocomplete
      getOptionLabel={(option) => option.label}
      renderInput={renderInput}
      PaperComponent={OptionsPaper}
      noOptionsText={i18n._('No Options')}
      {...props}
      options={options}
      value={value === null ? null : indexedOptions[value] || null}
      onChange={onChange}
      classes={classes}
    />
  );
}

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      '& > ul': {
        maxHeight: 8 * 32, // 8 item x item height
      },
    },
  });

const useStyles = makeStyles(styles, { name: 'SelectAutoComplete' });
type StyleProps = Styles<AutocompleteClassKey>;

export default SelectAutoComplete;
