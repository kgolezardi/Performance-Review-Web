import React from 'react';
import { Evaluation } from 'src/__generated__/enums';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, Typography, TypographyProps, createStyles, makeStyles } from '@material-ui/core';
import { getEnumLabel } from 'src/shared/enum-utils';
import { i18n } from '@lingui/core';
import { peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';

interface OwnProps {
  value: Evaluation | null;
  type: 'self' | 'peer';
  defaultValue?: string;
}

type Props = FCProps<OwnProps> & TypographyProps & StyleProps;

export function EvaluationOutput(props: Props) {
  const { value, type, defaultValue = '---', ...otherProps } = props;
  const classes = useStyles(otherProps);
  const color: TypographyProps['color'] = value ? 'textPrimary' : 'textSecondary';
  const label = value
    ? type === 'self'
      ? getEnumLabel(selfReviewEvaluationDictionary, value, i18n._('Unknown'))
      : getEnumLabel(peerReviewEvaluationDictionary, value, i18n._('Unknown'))
    : defaultValue;

  return (
    <Typography className={classes.root} color={color} {...otherProps}>
      {label}
    </Typography>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

const useStyles = makeStyles(styles, { name: 'EvaluationOutput' });
type StyleProps = Styles<typeof styles>;
