import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { PrintableResult } from 'src/pages/result-page/PrintableResult';
import { useAppSettings } from 'src/core/settings';
import { useAuthGuardUser } from 'src/core/auth';

interface OwnProps {}

export type Props = FCProps<OwnProps>;

export function PrintContainer(props: Props) {
  const { phase } = useAppSettings();
  const user = useAuthGuardUser();

  if (phase === 'RESULTS') {
    return <PrintableResult revieweeId={user.id} />;
  }
  return null;
}
