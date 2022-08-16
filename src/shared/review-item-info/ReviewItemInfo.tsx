import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { AnonymousReviewItemInfo } from './AnonymousReviewItemInfo';
import { IdentifiedReviewItemInfo } from './IdentifiedReviewItemInfo';

export type PersonType = 'self' | 'peer' | 'manager';
interface OwnProps {
  anonymous?: boolean;
  name?: string;
  src?: string;
  type: PersonType;
}

type Props = FCProps<OwnProps>;

export function ReviewItemInfo(props: Props) {
  const { anonymous = false, children, name, src, type } = props;

  return anonymous ? (
    <AnonymousReviewItemInfo type={type}>{children}</AnonymousReviewItemInfo>
  ) : (
    <IdentifiedReviewItemInfo name={name} src={src} type={type}>
      {children}
    </IdentifiedReviewItemInfo>
  );
}
