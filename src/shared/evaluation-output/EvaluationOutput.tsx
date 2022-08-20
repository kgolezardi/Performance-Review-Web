import React from 'react';
import { Evaluation } from 'src/__generated__/enums';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { Theme, TypographyProps, createStyles, makeStyles } from '@material-ui/core';
import { TypographyOutput } from 'src/shared/typography-output';
import { getEnumLabel } from 'src/shared/enum-utils';
import { i18n } from '@lingui/core';
import { peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';

interface OwnProps {
  value: Evaluation | null | undefined;
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
