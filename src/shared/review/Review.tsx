import { i18n } from '@lingui/core';
import { FormControl, InputLabel, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import DictInputItem from 'src/shared/forminator/inputs/dict-input/DictInputItem';
import LimitedTextAreaInput from 'src/shared/forminator/inputs/LimitedTextAreaInput';
import SelectInput from 'src/shared/forminator/inputs/SelectInput';
import { useLabelWidth } from 'src/shared/hooks/useLabelWidth';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  title: string;
  prefix: string;
}

type Props = FCProps<OwnProps> & StyleProps;

function Review({ title, prefix, ...props }: Props) {
  const classes = useStyles(props);

  const { labelWidth, labelRef } = useLabelWidth();

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.header}>
        <Typography variant="h3">{title}</Typography>
        <DictInputItem field={prefix + '_rating'}>
          <FormControl variant="outlined" classes={{ root: classes.formControl }} margin="dense">
            <InputLabel ref={labelRef}>{i18n._('Select')}</InputLabel>
            <SelectInput options={[{ label: 'label1', value: 'v1' }]} labelWidth={labelWidth} />
          </FormControl>
        </DictInputItem>
      </div>
      <DictInputItem field={prefix + '_description'}>
        <LimitedTextAreaInput variant="outlined" maxChars={280} rows={4} fullWidth />
      </DictInputItem>
    </Paper>
  );
}

Review.defaultProps = { initialValue: '' };
export default Review;

const styles = (theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[300],
  } as CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  } as CSSProperties,
  formControl: {
    minWidth: theme.spacing(30),
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'Review' });
type StyleProps = Styles<typeof styles>;
