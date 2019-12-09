import ArrayInput from 'src/shared/forminator/inputs/array-input/ArrayInput';
import ArrayOutput from 'src/shared/forminator/inputs/array-input/ArrayOutput';
import { Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import LimitedTextAreaInput from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  initialValues: [string, string, string];
  title: string;
}

type Props = FCProps<OwnProps> & StyleProps;

function StrengthsWeaknesses({ initialValues, title, ...props }: Props) {
  const classes = useStyles(props);
  return (
    <Paper className={classes.root} elevation={0}>
      <ArrayInput initialValue={initialValues}>
        <ArrayOutput>
          <Grid item xs={12} style={{ margin: 16 }}>
            <LimitedTextAreaInput
              label={title}
              variant="outlined"
              rows={2}
              maxChars={288}
              fullWidth
              inputProps={{ dir: 'auto' }}
            />
          </Grid>
        </ArrayOutput>
      </ArrayInput>
    </Paper>
  );
}

StrengthsWeaknesses.defaultProps = { initialValues: ['', '', ''] };

export default StrengthsWeaknesses;

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
