import React, { ComponentProps, useMemo } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Select } from 'src/shared/select';
import { Styles } from 'src/shared/types/Styles';
import { Theme, createStyles, makeStyles } from '@material-ui/core';
import { getOptionsFromDictionary } from 'src/shared/utils/getOptionsFromDictionary';
import { peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';

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
