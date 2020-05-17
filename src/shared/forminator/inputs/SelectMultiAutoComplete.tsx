import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import React, { ComponentType, useCallback, useMemo } from 'react';
import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete/Autocomplete';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { FCProps } from 'src/shared/types/FCProps';
import { OutlinedTextFieldProps, Paper, TextField, Theme, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';
import { indexBy, map, prop } from 'ramda';
import { withProps } from 'src/shared/utils/withProps';

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
  renderInput?: AutocompleteProps<Suggestion>['renderInput'];
  excludes?: string[]; // ids // TODO rethink about this prop
}
type Props<Suggestion extends BaseSuggestion = BaseSuggestion> = FCProps<OwnProps<Suggestion>> &
  Omit<AutocompleteProps<Suggestion>, 'value' | 'onChange' | 'defaultValue' | 'renderInput' | 'multiple'> &
  StyleProps;

const OptionsPaper: ComponentType = withProps(Paper, { elevation: 4 }) as any;

function SelectMultiAutoComplete<Suggestion extends BaseSuggestion = BaseSuggestion>({
  initialValue = [],
  options: allOptions,
  label,
  textFieldOptions,
  excludes,
  ...props
}: Props<Suggestion>) {
  const [values, setValues] = useForminatorState<string[], string[]>(initialValue);
  const classes = useStyles(props);

  const options = useMemo(() => {
    const excludesSet = new Set(excludes || []);
    return allOptions.filter((o) => !excludesSet.has(o.value));
  }, [allOptions, excludes]);
  const indexedOptions = useMemo(() => indexBy<Suggestion>(prop('value'), options), [options]);
  const onChange = useCallback(
    (event, newValue: Suggestion[]) => {
      setValues(map(prop('value'), newValue));
    },
    [setValues],
  );
  const renderInput: AutocompleteProps<Suggestion>['renderInput'] = useCallback(
    (params) => <TextField variant="outlined" label={label} fullWidth {...textFieldOptions} {...params} />,
    [textFieldOptions, label],
  );

  return (
    <Autocomplete
      getOptionLabel={(option) => option.label}
      renderInput={renderInput}
      PaperComponent={OptionsPaper}
      noOptionsText={i18n._('No Options')}
      {...props}
      multiple
      options={options}
      value={values.map((v) => indexedOptions[v]).filter((o) => o !== undefined)}
      onChange={onChange}
      classes={classes}
    />
  );
}

const styles = (theme: Theme) => ({
  paper: {
    '& > ul': {
      maxHeight: 8 * 32, // 8 item x item height
    },
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'SelectMultiAutoComplete' });
type StyleProps = Styles<AutocompleteClassKey>;

export default SelectMultiAutoComplete;
