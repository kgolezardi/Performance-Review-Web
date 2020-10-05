import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { AnonymousReviewItemOutput } from './AnonymousReviewItemOutput';
import { IdentifiedReviewItemOutput } from './IdentifiedReviewItemOutput';

interface OwnProps {
  anonymous?: boolean;
  disableTruncating?: boolean;
  name?: string;
  src?: string;
  type: 'self' | 'peer';
  value: string | null;
}

type Props = FCProps<OwnProps>;

export function ReviewItemOutput(props: Props) {
  const { anonymous = false, disableTruncating, name, src, type, value } = props;

  return anonymous ? (
    <AnonymousReviewItemOutput disableTruncating={disableTruncating} type={type} value={value} />
  ) : (
    <IdentifiedReviewItemOutput disableTruncating={disableTruncating} name={name} src={src} type={type} value={value} />
  );
}
