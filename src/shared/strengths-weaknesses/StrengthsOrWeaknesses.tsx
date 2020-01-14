import { i18n } from '@lingui/core';
import { Box, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import React, { useCallback } from 'react';
import { ConditionalSection, FragmentRef } from 'src/shared/forminator';
import { useFragmentLens } from 'src/shared/forminator/core/fragment-lens/useFragmentLens';
import ArrayAppendButton from 'src/shared/forminator/inputs/array-input/ArrayAppendButton';
import ArrayInput from 'src/shared/forminator/inputs/array-input/ArrayInput';
import ArrayOutput from 'src/shared/forminator/inputs/array-input/ArrayOutput';
import LimitedTextAreaInput from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { ClearIcon } from './ClearIcon';

interface OwnProps {
  title: string;
  maxLength: number;
  label?: string;
}

type Props = FCProps<OwnProps> & StyleProps;

export function StrengthsOrWeaknesses({ title, maxLength, label, ...props }: Props) {
  const classes = useStyles(props);
  const lens = useFragmentLens();
  const addButtonCondition = useCallback(
    (value: unknown[] | undefined) => {
      return !value || value.length < maxLength;
    },
    [maxLength],
  );
  const clearIconCondition = useCallback((value: unknown[] | undefined) => {
    return !(value && value.length === 1);
  }, []);

  return (
    <Box paddingTop={5}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
        </Grid>
        <ArrayInput initialValue={[undefined]}>
          <FragmentRef lens={lens} />
          <ArrayOutput>
            <Grid item xs={12}>
              <div className={classes.textAreaWrapper}>
                <div>
                  <LimitedTextAreaInput
                    variant="outlined"
                    maxChars={280}
                    label={label}
                    fullWidth
                    inputProps={{ dir: 'auto' }}
                  />
                </div>
                <div>
                  <ConditionalSection lens={lens} condition={clearIconCondition}>
                    <ClearIcon />
                  </ConditionalSection>
                </div>
              </div>
            </Grid>
          </ArrayOutput>
          <ConditionalSection condition={addButtonCondition} lens={lens}>
            <Grid item xs />
            <Grid item>
              <ArrayAppendButton variant="outlined" color="primary" startIcon={<AddIcon />}>
                {i18n._('Add')}
              </ArrayAppendButton>
            </Grid>
          </ConditionalSection>
        </ArrayInput>
      </Grid>
    </Box>
  );
}

const styles = (theme: Theme) => ({
  textAreaWrapper: {
    display: 'grid',
    gridTemplateColumns: `100% ${theme.spacing(1)}px`,
    gridGap: theme.spacing(),
    alignItems: 'center',
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'StrengthsOrWeaknesses' });
type StyleProps = Styles<typeof styles>;
