import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { AnonymousReviewItemInfo } from './AnonymousReviewItemInfo';
import { IdentifiedReviewItemInfo } from './IdentifiedReviewItemInfo';

interface OwnProps {
  anonymous?: boolean;
  name?: string;
  src?: string;
  type: 'self' | 'peer';
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
