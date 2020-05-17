import React, { SuspenseConfig, unstable_useDeferredValue as useDeferredValue, useEffect, useState } from 'react';
import { FCProps } from 'src/shared/types/FCProps';
import { History } from 'history';
import { __HistoryContext as HistoryContext } from 'react-router';
import { __RouterContext as RouterContext } from 'react-router';

interface OwnProps {
  suspenseConfig?: SuspenseConfig | null;
  history: History;
}
type Props = FCProps<OwnProps>;

const defaultConfig: SuspenseConfig = { timeoutMs: 300 };
function computeRootMatch(pathname: string) {
  return { path: '/', url: '/', params: {}, isExact: pathname === '/' };
}
export function Router(props: Props) {
  // TODO provide transition pending location
  const { history, suspenseConfig = defaultConfig, children = null } = props;
  const [location, setLocation] = useState(() => history.location);

  useEffect(() => {
    if (location !== history.location) {
      // handle initial pending location
      // https://github.com/ReactTraining/react-router/blob/a1b96d5085053d1e3d67831a75d9a6c76e8dca70/packages/react-router/modules/Router.js#L22-L26
      setLocation(history.location);
    }
    return history.listen((location) => {
      setLocation(location);
    });
    // `location` variable only used on initial value, because between render and useEffect if location has been
    // changed like redirect, we can detect and change location state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);
  const deferredLocation = useDeferredValue(location, suspenseConfig);
  return (
    <RouterContext.Provider
      value={{
        history: props.history,
        location: deferredLocation,
        match: computeRootMatch(location.pathname),
      }}
    >
      <HistoryContext.Provider children={children} value={history} />
    </RouterContext.Provider>
  );
}

export type RouterProps = Props;
