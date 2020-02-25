import React, { useState } from 'react';
import { BrowserHistoryBuildOptions } from 'history/createBrowserHistory';
import { FCProps } from 'src/shared/types/FCProps';
import { createBrowserHistory as createHistory } from 'history';

import { Router, RouterProps } from './Router';

interface OwnProps extends Omit<RouterProps, 'history'> {
  historyOptions: BrowserHistoryBuildOptions;
}

type Props = FCProps<OwnProps>;

export function BrowserRouter(props: Props) {
  const { historyOptions, ...rest } = props;
  const [history] = useState(() => createHistory(historyOptions));

  return <Router {...rest} history={history} />;
}
