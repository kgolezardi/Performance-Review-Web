import { i18n } from '@lingui/core';
import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';
import { Evaluation, peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';
import { NON_BREAKING_SPACE } from 'src/shared/constants';
import { getEnumLabel } from 'src/shared/enum-utils';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';

interface OwnProps {
  value: Evaluation | '%future added value' | null;
  type: 'self' | 'peer';
}

type Props = FCProps<OwnProps> & TypographyProps & StyleProps;

export function EvaluationOutput(props: Props) {
  const { value, type, ...otherProps } = props;
  const classes = useStyles(otherProps);
  const label = value
    ? type === 'self'
      ? getEnumLabel(selfReviewEvaluationDictionary, value, i18n._('Unknown'))
      : getEnumLabel(peerReviewEvaluationDictionary, value, i18n._('Unknown'))
    : NON_BREAKING_SPACE;

  return (
    <Typography className={classes.root} {...otherProps}>
      {label}
    </Typography>
  );
}

const styles = (theme: Theme) => ({
  root: {
    color: theme.palette.common.black,
  } as CSSProperties,
});

const useStyles = makeStyles(styles, { name: 'EvaluationOutput' });
type StyleProps = Styles<typeof styles>;
