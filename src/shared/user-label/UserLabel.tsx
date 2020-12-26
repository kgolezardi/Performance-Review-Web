import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { useAuthGuardUser } from 'src/core/auth';

interface OwnProps {
  short?: boolean;
}

type Props = FCProps<OwnProps>;

export function UserLabel(props: Props) {
  const { short } = props;
  const { userLabel, shortUserLabel } = useAuthGuardUser();

  return <span>{short ? shortUserLabel : userLabel}</span>;
}
