import { History } from 'history';
import React, { SuspenseConfig, useEffect, useState, useTransition } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import { FCProps } from 'src/shared/types/FCProps';

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
  // TODO handle initial pending location
  // https://github.com/ReactTraining/react-router/blob/a1b96d5085053d1e3d67831a75d9a6c76e8dca70/packages/react-router/modules/Router.js#L22-L26
  // TODO provide transition pending location
  const { history, suspenseConfig = defaultConfig, children = null } = props;
  const [location, setLocation] = useState(() => history.location);
  const [startTransition] = useTransition(suspenseConfig);

  useEffect(() => {
    return history.listen(location => {
      startTransition(() => {
        setLocation(location);
      });
    });
  }, [history, startTransition]);
  return (
    <RouterContext.Provider
      children={children}
      value={{
        history: props.history,
        location: location,
        match: computeRootMatch(location.pathname),
      }}
    />
  );
}

export type RouterProps = Props;
