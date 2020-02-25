import { createBrowserHistory as createHistory } from 'history';
import { BrowserHistoryBuildOptions } from 'history/createBrowserHistory';
import React, { useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { Router, RouterProps } from './Router';

interface OwnProps extends Omit<RouterProps, 'history'> {
  historyOptions: BrowserHistoryBuildOptions;
}

type Props = FCProps<OwnProps>;

export function BrowserRouter(props: Props) {
  const { historyOptions, ...rest } = props;
  const [history] = useState(() => createHistory(historyOptions));
  const originalPush = history.push;
  history.push = (args: any) => {
    if (typeof args === 'string') {
      return originalPush(args);
    }
    if (args && args.state && args.state.animate) {
      args.state.animate().then(() => {
        delete args.state.animate;
        originalPush(args);
      });
    } else {
      originalPush(args);
    }
  };
  return <Router {...rest} history={history} />;
}
