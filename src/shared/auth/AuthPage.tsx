import React from 'react';
import { FCProps } from 'src/shared/types/FCProps';

import { Login } from './Login';

interface OwnProps {}

type Props = FCProps<OwnProps>;

export function AuthPage(props: Props) {
  return <Login />;
}
