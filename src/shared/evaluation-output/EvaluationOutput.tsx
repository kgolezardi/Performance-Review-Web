import { i18n } from '@lingui/core';
import { createStyles, makeStyles, Theme, TypographyProps } from '@material-ui/core';
import React from 'react';
import { peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';
import { getEnumLabel } from 'src/shared/enum-utils';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { TypographyOutput } from 'src/shared/typography-output';
import { Evaluation } from 'src/__generated__/enums';

interface OwnProps {
  value: Evaluation | null;
  type: 'self' | 'peer';
  defaultValue?: string;
}

type Props = FCProps<OwnProps> & TypographyProps & StyleProps;

export function EvaluationOutput(props: Props) {
  const { value, type, defaultValue = '---', ...otherProps } = props;
  const classes = useStyles(otherProps);

  const label = value
    ? type === 'self'
      ? getEnumLabel(selfReviewEvaluationDictionary, value, i18n._('Unknown'))
      : getEnumLabel(peerReviewEvaluationDictionary, value, i18n._('Unknown'))
    : defaultValue;

  return <TypographyOutput className={classes.root} value={label} {...otherProps} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
  });

const useStyles = makeStyles(styles, { name: 'EvaluationOutput' });
type StyleProps = Styles<typeof styles>;
