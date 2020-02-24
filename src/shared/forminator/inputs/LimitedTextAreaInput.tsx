import { FormHelperText, makeStyles, Omit, TextField, TextFieldProps, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React, { Fragment, useCallback } from 'react';
import { Counter } from 'src/shared/counter';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { useForminatorState } from '../core/useForminatorState';

interface OwnProps {
  initialValue?: string;
  maxChars: number;
}

type Props = FCProps<OwnProps> & Omit<TextFieldProps, 'value' | 'onChange' | 'defaultValue'> & StyleProps;

function LimitedTextAreaInput(props: Props) {
  const { initialValue = '', maxChars, error, helperText, InputProps = {}, ...rest } = props;
  const classes = useStyles(props);

  const [value, setValue] = useForminatorState(initialValue);
  const onChange = useCallback(
    event => {
      const value = event.target.value;
      if (value.length <= maxChars) {
        setValue(value);
      }
    },
    [setValue, maxChars],
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <TextField
          multiline
          {...rest}
          className={classes.textField}
          InputProps={{ ...InputProps, classes: { multiline: classes.multiline, ...InputProps.classes } }}
          value={value}
          onChange={onChange}
          error={error}
        />
        <div className={classes.counterWrapper}>
          <Counter count={value.length} max={maxChars} />
        </div>
      </div>
      {helperText && (
        <FormHelperText error={error} classes={{ root: classes.formHelperTextRoot }}>
          {helperText}
        </FormHelperText>
      )}
    </Fragment>
  );
}

export default LimitedTextAreaInput;

const styles = (theme: Theme) => ({
  root: {
    position: 'relative',
  } as CSSProperties,
  textField: {} as CSSProperties,
  multiline: {
    paddingBottom: theme.spacing(3),
  } as CSSProperties,
  counterWrapper: {
    position: 'absolute',
    right: theme.spacing(),
    bottom: 0,
  } as CSSProperties,
  formHelperTextRoot: {
    fontFamily: 'Shabnam FD',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'LimitedTextAreaInput' });
type StyleProps = Styles<typeof styles>;
