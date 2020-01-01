import { createBrowserHistory as createHistory } from 'history';
import React, { useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Router, RouterProps } from './Router';

interface OwnProps extends Omit<RouterProps, 'history'> {}

type Props = FCProps<OwnProps>;

export function BrowserRouter(props: Props) {
  const [history] = useState(() => createHistory());

  return <Router {...props} history={history} />;
}
