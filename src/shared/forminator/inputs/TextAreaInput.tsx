import { makeStyles, Omit, TextField, Theme } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { TextFieldProps } from '@material-ui/core/TextField';
import React, { useCallback } from 'react';
import CharacterCounter from 'src/shared/forminator/utils/CharacterCounter';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { useForminatorState } from '../core/useForminatorState';

interface OwnProps {
  initialValue: string;
  maxChars: number;
}

type Props = FCProps<OwnProps> & Omit<TextFieldProps, 'value' | 'onChange' | 'defaultValue'> & StyleProps;

function LimitedTextAreaInput({ initialValue, maxChars, ...props }: Props) {
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
    <div className={classes.root}>
      <TextField {...props} multiline className={classes.textField} value={value} onChange={onChange} />
      {!!maxChars && (
        <CharacterCounter
          chars={value.length}
          maxChars={maxChars}
          classes={{
            root: classes.characterCounter,
            circularProgress: classes.circularProgress,
          }}
        />
      )}
    </div>
  );
}
LimitedTextAreaInput.defaultProps = { initialValue: '' };
export default LimitedTextAreaInput;

const styles = (theme: Theme) => ({
  root: {} as CSSProperties,
  textField: {} as CSSProperties,
  characterCounter: {} as CSSProperties,
  circularProgress: {} as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'LimitedTextAreaInput' });
type StyleProps = Styles<typeof styles>;
