import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { ComponentProps, useMemo } from 'react';
import { peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';
import { Select } from 'src/shared/select';
import { FCProps } from 'src/shared/types/FCProps';
import { Styles } from 'src/shared/types/Styles';
import { getOptionsFromDictionary } from 'src/shared/utils/getOptionsFromDictionary';

interface OwnProps extends Omit<ComponentProps<typeof Select>, 'options'> {
  type: 'self' | 'peer';
}

type Props = FCProps<OwnProps> & StyleProps;

export function Rating(props: Props) {
  const { type, ...selectProps } = props;
  const classes = useStyles(props);

  const options = useMemo(
    () =>
      type === 'self'
        ? getOptionsFromDictionary(selfReviewEvaluationDictionary)
        : getOptionsFromDictionary(peerReviewEvaluationDictionary),
    [type],
  );
  return <Select options={options} {...selectProps} classes={classes} />;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    select: {
      background: 'white',
      '&:focus': {
        background: 'white',
      },
    },
  });
const useStyles = makeStyles(styles, { name: 'Rating' });
type StyleProps = Styles<typeof styles>;
