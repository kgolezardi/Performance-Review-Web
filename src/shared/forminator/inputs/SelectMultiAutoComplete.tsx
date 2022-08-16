import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import React, { ComponentType, useCallback, useMemo } from 'react';
import { AutocompleteClassKey } from '@material-ui/lab/Autocomplete/Autocomplete';
import { FCProps } from 'src/shared/types/FCProps';
import { Paper, TextField, TextFieldProps, Theme, createStyles, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';
import { i18n } from '@lingui/core';
import { indexBy, map, prop } from 'ramda';
import { useBiDiSnackbar } from 'src/shared/snackbar';
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
  textFieldOptions?: Omit<TextFieldProps, 'variant'>;
  renderInput?: AutocompleteProps<Suggestion>['renderInput'];
  maximumValues?: number;
  messageMaximumReviewers?: string;
  excludes?: string[]; // ids // TODO rethink about this prop
}
type Props<Suggestion extends BaseSuggestion = BaseSuggestion> = FCProps<OwnProps<Suggestion>> &
  Omit<AutocompleteProps<Suggestion>, 'value' | 'onChange' | 'defaultValue' | 'renderInput' | 'multiple'> &
  SelectMultiAutoCompleteClasses;

const OptionsPaper: ComponentType = withProps(Paper, { elevation: 4 }) as any;

function SelectMultiAutoComplete<Suggestion extends BaseSuggestion = BaseSuggestion>({
  initialValue = [],
  options: allOptions,
  label,
  textFieldOptions,
  excludes,
  maximumValues: maximumValuesProp = -1,
  messageMaximumReviewers: messageMaximumReviewersProp,

  ...props
}: Props<Suggestion>) {
  const [values, setValues] = useForminatorState<string[], string[]>(initialValue);
  const classes = useStyles(props);

  const { enqueueSnackbar } = useBiDiSnackbar();

  const maximumValues = maximumValuesProp > 0 ? maximumValuesProp : Number.POSITIVE_INFINITY;
  const messageMaximumReviewers =
    messageMaximumReviewersProp ?? i18n._('You can choose maximum {num} reviewers', { num: maximumValues });

  const options = useMemo(() => {
    const excludesSet = new Set(excludes || []);
    return allOptions.filter((o) => !excludesSet.has(o.value));
  }, [allOptions, excludes]);

  const indexedOptions = useMemo(() => indexBy<Suggestion>(prop('value'), options), [options]);

  const onChange = useCallback(
    (event, newValue: Suggestion[]) => {
      if (maximumValues < newValue.length) {
        enqueueSnackbar(messageMaximumReviewers, { variant: 'warning', preventDuplicate: true });
        return;
      }
      setValues(map(prop('value'), newValue));
    },
    [enqueueSnackbar, maximumValues, messageMaximumReviewers, setValues],
  );

  const renderInput: AutocompleteProps<Suggestion>['renderInput'] = useCallback(
    (params) => <TextField variant="outlined" label={label} fullWidth {...textFieldOptions} {...params} />,
    [label, textFieldOptions],
  );

  const selectedValues = values.map((v) => indexedOptions[v]).filter((o) => o !== undefined);

  return (
    <Autocomplete
      getOptionLabel={(option) => option.label}
      renderInput={renderInput}
      PaperComponent={OptionsPaper}
      noOptionsText={i18n._('No Options')}
      {...props}
      multiple
      options={options}
      value={selectedValues}
      onChange={onChange}
      classes={classes}
      popupIcon={maximumValues <= selectedValues.length ? null : undefined}
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
    root: {},
  });

const useStyles = makeStyles(styles, { name: 'SelectMultiAutoComplete' });
export type SelectMultiAutoCompleteClasses = Styles<AutocompleteClassKey>;

export default SelectMultiAutoComplete;
