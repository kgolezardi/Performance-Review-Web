import ArrayInput from 'src/shared/forminator/inputs/array-input/ArrayInput';
import ArrayOutput from 'src/shared/forminator/inputs/array-input/ArrayOutput';
import { Card, CardHeader, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { useCallback } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Styles } from 'src/shared/types/Styles';
import ArrayAppendButton from 'src/shared/forminator/inputs/array-input/ArrayAppendButton';
import { ConditionalSection } from 'src/shared/forminator';
import { useFragmentLens } from '../forminator/core/fragment-lens/useFragmentLens';
import { FragmentRef } from 'src/shared/forminator';
import LimitedTextAreaInput from '../forminator/inputs/LimitedTextAreaInput';
import { i18n } from '@lingui/core';

interface OwnProps {
  title: string;
  maxLength: number;
}

type Props = FCProps<OwnProps> & StyleProps;

export function StrengthsOrWeaknesses({ title, maxLength, ...props }: Props) {
  const classes = useStyles(props);
  const lens = useFragmentLens();
  const condition = useCallback(
    (value: unknown[]) => {
      return value ? value.length < maxLength : true;
    },
    [maxLength],
  );
  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader title={title} />
      <Grid container spacing={2}>
        <ArrayInput initialValue={[undefined]}>
          <FragmentRef lens={lens} />
          <ArrayOutput>
            <Grid item xs={12}>
              <LimitedTextAreaInput variant="outlined" rows={2} maxChars={280} fullWidth inputProps={{ dir: 'auto' }} />
            </Grid>
          </ArrayOutput>
          <ConditionalSection condition={condition} lens={lens}>
            <Grid item>
              <ArrayAppendButton>{i18n._('Add')}</ArrayAppendButton>
            </Grid>
          </ConditionalSection>
        </ArrayInput>
      </Grid>
    </Card>
  );
}

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[300],
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'StrengthsWeaknesses' });
type StyleProps = Styles<typeof styles>;
