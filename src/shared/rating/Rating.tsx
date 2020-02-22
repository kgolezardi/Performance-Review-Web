import React, { ComponentProps, useMemo } from 'react';
import { peerReviewEvaluationDictionary, selfReviewEvaluationDictionary } from 'src/global-types';
import { Select } from 'src/shared/select';
import { FCProps } from 'src/shared/types/FCProps';
import { getOptionsFromDictionary } from 'src/shared/utils/getOptionsFromDictionary';

interface OwnProps extends Omit<ComponentProps<typeof Select>, 'options'> {
  type: 'self' | 'peer';
}

type Props = FCProps<OwnProps>;

export function Rating(props: Props) {
  const { type, ...selectProps } = props;
  const options = useMemo(
    () =>
      type === 'self'
        ? getOptionsFromDictionary(selfReviewEvaluationDictionary)
        : getOptionsFromDictionary(peerReviewEvaluationDictionary),
    [type],
  );
  return <Select options={options} {...selectProps} />;
}
