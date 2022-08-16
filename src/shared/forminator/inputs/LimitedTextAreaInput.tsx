import React, { Fragment, useCallback } from 'react';
import { Counter } from 'src/shared/counter';
import { FCProps } from 'src/shared/types/FCProps';
import { FormHelperText, Omit, TextField, TextFieldProps, Theme, createStyles, makeStyles } from '@material-ui/core';
import { Styles } from 'src/shared/types/Styles';

import { useForminatorState } from '../core/useForminatorState';

interface OwnProps {
  initialValue?: string;
  maxChars: number;
  /**
   * Indicates after how many characters, the `Counter` component will be displayed
   */
  counterDisplayThreshold?: number;
}

type Props = FCProps<OwnProps> &
  Omit<TextFieldProps, 'value' | 'onChange' | 'defaultValue'> &
  LimitedTextAreaInputClasses;

function LimitedTextAreaInput(props: Props) {
  const {
    initialValue = '',
    maxChars,
    counterDisplayThreshold = 0,
    error,
    helperText,
    InputProps = {},
    FormHelperTextProps,
    ...rest
  } = props;
  const classes = useStyles(props);

  const [value, setValue] = useForminatorState(initialValue);
  const onChange = useCallback(
    (event) => {
      const value = event.target.value;
      if (value.length <= maxChars) {
        setValue(value);
      }
    },
    [setValue, maxChars],
  );

  const showCounter = value.length >= counterDisplayThreshold;

  return (
    <Fragment>
      <div className={classes.root}>
        <TextField
          multiline
          {...rest}
          classes={{ root: classes.textField }}
          InputProps={{ ...InputProps, classes: { multiline: classes.multiline, ...InputProps.classes } }}
          value={value}
          onChange={onChange}
          error={error}
        />
        {showCounter && <Counter count={value.length} max={maxChars} classes={{ root: classes.counter }} />}
      </div>
      {helperText && (
        <FormHelperText {...FormHelperTextProps} error={error}>
          {helperText}
        </FormHelperText>
      )}
    </Fragment>
  );
}

export default LimitedTextAreaInput;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    textField: {},
    multiline: {
      paddingBottom: theme.spacing(3),
    },
    counter: {
      position: 'absolute',
      right: theme.spacing(),
      bottom: 0,
    },
  });

const useStyles = makeStyles(styles, { name: 'LimitedTextAreaInput' });
export type LimitedTextAreaInputClasses = Styles<typeof styles>;
